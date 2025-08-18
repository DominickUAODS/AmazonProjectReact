import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserType } from '../../types/UserType';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
	user: UserType | null;
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	login: (user: UserType, tokens: { access: string; refresh: string }, staySignedIn?: boolean) => void;
	logout: () => void;
	authFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<UserType | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [refreshToken, setRefreshToken] = useState<string | null>(null);

	// Проверка хранилища при монтировании
	useEffect(() => {
		const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
		const storedAccess = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
		const storedRefresh = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');

		if (storedUser && storedAccess && storedRefresh) {
			setUser(JSON.parse(storedUser));
			setAccessToken(storedAccess);
			setRefreshToken(storedRefresh);
		}
	}, []);

	const saveToStorage = (user: UserType, tokens: { access: string; refresh: string }, staySignedIn: boolean) => {
		const storage = staySignedIn ? localStorage : sessionStorage;
		storage.setItem('user', JSON.stringify(user));
		storage.setItem('accessToken', tokens.access);
		storage.setItem('refreshToken', tokens.refresh);
	};

	const login = (user: UserType, tokens: { access: string; refresh: string }, staySignedIn = false) => {
		saveToStorage(user, tokens, staySignedIn);
		setUser(user);
		setAccessToken(tokens.access);
		setRefreshToken(tokens.refresh);
	};

	const logout = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('accessToken');
		sessionStorage.removeItem('refreshToken');

		setUser(null);
		setAccessToken(null);
		setRefreshToken(null);
		navigate("/");
	};

	// Автообновление accessToken через refreshToken
	const refreshAccessToken = async (): Promise<string | null> => {
		if (!refreshToken) return null;
		try {
			const res = await fetch('/auth/refresh', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ refresh_token: refreshToken }),
			});

			if (!res.ok) throw new Error('Failed to refresh token');

			const data = await res.json();
			setAccessToken(data.access_token);

			// Обновляем хранилище
			if (localStorage.getItem('refreshToken') === refreshToken) {
				localStorage.setItem('accessToken', data.access_token);
			} else if (sessionStorage.getItem('refreshToken') === refreshToken) {
				sessionStorage.setItem('accessToken', data.access_token);
			}

			return data.access_token;
		} catch {
			logout();
			return null;
		}
	};

	// Умный fetch для авторизованных запросов
	const authFetch = async (input: RequestInfo, init: RequestInit = {}) => {
		if (!accessToken) throw new Error('No access token');

		init.headers = {
			...init.headers,
			Authorization: `Bearer ${accessToken}`,
		};

		let res = await fetch(input, init);

		if (res.status === 401) {
			const newAccessToken = await refreshAccessToken();
			if (!newAccessToken) throw new Error('Unauthorized');

			init.headers = {
				...init.headers,
				Authorization: `Bearer ${newAccessToken}`,
			};

			res = await fetch(input, init);
		}

		return res;
	};

	return (
		<AuthContext.Provider value={{ user, accessToken, refreshToken, isAuthenticated: !!user, login, logout, authFetch }}>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};
