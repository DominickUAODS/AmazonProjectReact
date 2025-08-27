
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SkeletonLoader from "./SkeletonLoader";


export default function RequireAdmin() {
	const { user, isAuthenticated, loading } = useAuth();

	if (loading) {
		return <SkeletonLoader />;
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	if (user?.role !== "Administrator") {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
