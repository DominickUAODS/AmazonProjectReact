import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminComp/AdminHeader";

export default function AdminLayout() {
	return (
		<div className="pageWrapper">
			<AdminHeader />
			<main className="pageContent">
				<Outlet />
			</main>
		</div>
	);
}