import { useNavigate } from 'react-router-dom';
import commonStyles from '../common.module.css';
import UploadImage from '../Helpers/UploadImage';
import { getCloudinaryPublicId } from '../Helpers/getCloudinaryPublicId';
import { useState } from 'react';
import { useAuth } from '../Helpers/AuthContext';


export default function ChangeNameModal() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const closeModal = () => navigate("/settings");
	const [errors, setErrors] = useState<{ general?: string }>({});
	const { authFetch, accessToken } = useAuth();

	let staySignedIn = false;
	if (localStorage.length !== 0){
		staySignedIn = true;
	}

	const storage = staySignedIn ? localStorage : sessionStorage;

	const storedData = storage.getItem("user");

	const user = storedData ? JSON.parse(storedData) : null;

	const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	const handleUploadComplete = async (responseUpload: any) => {
		console.log('Upload success:', responseUpload);
		
		try {
			const response = await authFetch(`${API_SERVER}/users/`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` },
				body: JSON.stringify({ 
					id: user.id, 
					profile_photo: responseUpload.secure_url,
					role: user.role
				}),
			});

			if (!response.ok) {
				const err = await response.json();
				setErrors({ general: err.message || 'Update photo failed' });
				return;
			}

			const data = await response.json();
			console.log(data);

			// Сохраняем токены
			//storage.setItem('accessToken', data.access_token);
			//storage.setItem('refreshToken', data.refresh_token);
			storage.setItem('user', JSON.stringify(data));

			//login(data.user, { access: data.access_token, refresh: data.refresh_token }, staySignedIn);

			closeModal();
			navigate('/settings'); // или на dashboard

		} catch (err) {
			console.error(err);
			setErrors({ general: 'Ошибка подключения к серверу' });
		}
	};


	return (
		<div className={commonStyles.modalBackdrop}>
			<div className={commonStyles.cnModal} onClick={(e) => e.stopPropagation()}>
				<div className={commonStyles.modalInfo}>
					<span className={commonStyles.modalInfoSpan}> Change photo </span>
				</div>

				<UploadImage
					buttonLabel="Upload"
					className={commonStyles.nextStepButton}
					onUploadComplete={handleUploadComplete}
					publicId={getCloudinaryPublicId(user.profile_photo)}
				/>

				<div className={commonStyles.buttonGroup}>
					<button onClick={handleBackdropClick} className={commonStyles.secondaryButton}>Cancel</button>

					{/* <button className={commonStyles.nextStepButton}>Confirm</button> */}
				</div>
				{errors.general && <div className={commonStyles.errorText}>{errors.general}</div>}
			</div>
		</div>
	);
}