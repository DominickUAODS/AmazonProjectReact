import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth() {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
