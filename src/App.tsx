import './App.css'
import Layout from './components/Layout';
import { Routes, Route, useLocation } from "react-router-dom";

import { Main } from './components/Main'
import { ProductList } from './components/ProductComp/ProductList';
import AccountSettings from './components/AccountComp/AccountSettings';
import AccountWishlist from './components/AccountComp/AccountWishlist';
import SignUpAccount from './components/SignUpAccount/SignUpAccount';
import LogInAccount from './components/LogInAccount/LogInAccount';
import EnterCodeFromGmail from './components/SignUpAccount/EnterCodeFromGmail';
import SignUpFinal from './components/SignUpAccount/SignUpFinal';
import Congrats from './components/SignUpAccount/Congrats';
import ForgotPassword from './components/LogInAccount/ForgotPassword';
import ResetPassword from './components/LogInAccount/ResetPassword';
import AccountOrders from './components/AccountComp/AccountOrders';
import ChangeNameModal from './components/AccountModalWindows/ChangeNameModal';
import ChangePasswordModal from './components/AccountModalWindows/ChangePasswordModal';
import ChangeEmailModal from './components/AccountModalWindows/ChangeEmailModal';
import LogOutModal from './components/AccountModalWindows/LogOutModal';
import DeleteAccountModal from './components/AccountModalWindows/DeleteAccountModal';
import ProductPage from './components/ProductPageComp/ProductPage';
import type { ModalState } from './types/ModalState';
import { AuthProvider } from './components/Helpers/AuthContext';
import RequireAuth from './components/Helpers/RequireAuth';
import ChangePhotoModal from './components/AccountModalWindows/ChangePhotoModal';
import MainMenu from './components/MainMenu/MainMenu';
import AdminPanel from './components/AdminComp/Users/AdminPanel';
import AdminMenu from './components/AdminComp/AdminMenu/AdminMenu';
import AdminLayout from './components/AdminLayout';
import RequireAdmin from './components/Helpers/RequireAdmin';
import LoginAdmin from './components/AdminComp/Users/LoginAdmin';
import CategoriesPage from './components/AdminComp/Products/CategoriesPage';
import Checkout from './components/Checkout/Checkout';
import ProductByCategory from './components/AdminComp/ProductByCategory/ProductByCategory';
import EditCreateProduct from './components/AdminComp/ProductByCategory/EditCreateProduct';
import LegalNoticeInfo from './components/LegalNotice/LegalNoticeInfo';
import Terms from './components/LegalNotice/Terms';
import License from './components/LegalNotice/License';
import Policy from './components/LegalNotice/Policy';
import LegalMenuMobile from './components/LegalNotice/LegalMenuMobile';
import AccountMenu from './components/AccountMenu/AccountMenu';
import NotFound from './components/LegalNotice/NotFound';

function App() {
	const location = useLocation();
	const state = location.state as ModalState | undefined;
	const background = state?.background;

	// console.log(`location: ${location}`);
	// console.log(`state: ${state}`);
	// console.log(`background: ${background}`);

	return (
		<>
			<AuthProvider>
				<Routes location={background || location}>
					<Route path = "not-found" element={<NotFound/>}/>
					<Route path="/" element={<Layout />}>

						{/* main pages */}
						<Route index element={<Main />} />
						<Route path="products/:id" element={<ProductList />} />
						<Route path="product/:id" element={<ProductPage />} />

						{/* private routes */}
						<Route element={<RequireAuth />}>
							<Route path="settings" element={<AccountSettings />} />
							<Route path="wishlist" element={<AccountWishlist />} />
							<Route path="orders" element={<AccountOrders />} />
							<Route path="checkout" element={<Checkout />} />
							<Route path="account-menu" element={<AccountMenu/>}/>
						</Route>

						{/* Экран выбора для мобильных */}
						<Route path="/legal" element={<LegalMenuMobile />} />

						{/* Основной контейнер для desktop */}
						<Route path="/legal/terms" element={<LegalNoticeInfo><Terms /></LegalNoticeInfo>} />
						<Route path="/legal/license" element={<LegalNoticeInfo><License /></LegalNoticeInfo>} />
						<Route path="/legal/policy" element={<LegalNoticeInfo><Policy /></LegalNoticeInfo>} />

					</Route>
					{/* </Routes> */}

					{/* admin panel */}
					{/* <Routes location={background || location}> */}
					<Route path="/-/" element={<AdminLayout />}>
						<Route path="login-admin" element={<LoginAdmin />} />

						<Route element={<RequireAdmin />}>
							<Route path="admin-panel" element={<AdminPanel />} />
							<Route path="admin-category" element={<CategoriesPage />} />
							<Route path="admin-product" element={<ProductByCategory />} />
							<Route path="product-settings" element={<EditCreateProduct />} />
							<Route path="product-settings/:id" element={<EditCreateProduct />} />
						</Route>
					</Route>
				</Routes>




				{background && (
					<Routes>
						{/* log in modal windows */}
						<Route path="/login" element={<LogInAccount background={background} />} />
						<Route path="/forgot-password" element={<ForgotPassword background={background} />} />
						<Route path="/checkin-for-password" element={<EnterCodeFromGmail background={background} isPasswordReset={true} />} />
						<Route path="/reset-Password" element={<ResetPassword background={background} />} />


						{/* sign up modal windows */}
						<Route path="/signup" element={<SignUpAccount background={background} />} />
						<Route path="/checkin" element={<EnterCodeFromGmail background={background} isPasswordReset={false} />} />
						<Route path="/final-signup" element={<SignUpFinal background={background} />} />
						<Route path="/congrats" element={<Congrats />} />

						{/* user settings modal windows */}
						<Route element={<RequireAuth />}>
							<Route path="/change-photo" element={<ChangePhotoModal />} />
							<Route path="/change-name" element={<ChangeNameModal />} />
							<Route path="/change-password" element={<ChangePasswordModal />} />
							<Route path="/change-email" element={<ChangeEmailModal />} />
							<Route path="/logout" element={<LogOutModal />} />
							<Route path="/delete" element={<DeleteAccountModal />} />
						</Route>

						{/*menu modal*/}
						<Route path="/menu" element={<MainMenu background={background} />} />
						<Route path='/-/admin-panel/menu' element={<AdminMenu background={background} />} />
					</Routes >
				)}
			</AuthProvider>
		</>
	);
}

export default App;