import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SkeletonLoader from "./SkeletonLoader";

export default function RequireAuth() {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return <SkeletonLoader />;
	}

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
