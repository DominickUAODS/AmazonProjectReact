import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { generateCloudinarySignature, type CloudinaryParams } from './Signature';
import styles from './UploadImage.module.css';

interface UploadImageProps {
	onUploadComplete?: (response: unknown) => void;
	onError?: (error: Error) => void;
	buttonLabel?: string;
	className?: string;
	publicId?: string;
}

const UploadImage: React.FC<UploadImageProps> = ({
	onUploadComplete,
	onError,
	buttonLabel = 'Upload',
	className,
	publicId,
}) => {
	const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
	const CLOUD_API = import.meta.env.VITE_CLOUD_API;
	const CLOUD_SECRET = import.meta.env.VITE_CLOUD_SECRET;

	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setFile(event.target.files[0]);
		}
	};

	const uploadFile = async () => {
		if (!file) {
			console.error('Please select a file.');
			return;
		}

		const timestamp = Math.floor(Date.now() / 1000);

		const params: CloudinaryParams = {
			timestamp,
			public_id: publicId || uuid(),
		};

		const signature = generateCloudinarySignature(params, CLOUD_SECRET);

		setUploading(true);

		try {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('public_id', params.public_id.toString());
			formData.append('timestamp', params.timestamp.toString());
			formData.append('api_key', CLOUD_API);
			formData.append('signature', signature);

			const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
				{
					method: 'POST',
					body: formData,
				}
			);

			if (!response.ok) {
				throw new Error('Upload failed.');
			}

			const result = await response.json();

			setUploading(false);
			setFile(null);

			if (onUploadComplete) {
				onUploadComplete(result);
			}
		} catch (err: any) {
			setUploading(false);
			if (onError) {
				onError(err);
			} else {
				console.error('Upload error:', err);
			}
		}
	};

	return (
		<div className={styles.uploadWrapper}>
			<input
				id="fileUpload"
				type="file"
				onChange={handleFileChange}
				className={styles.fileInput}
			/>

			<label htmlFor="fileUpload" className={styles.customFileLabel}>
				{file ? file.name : 'Choose a file'}
			</label>

			<button
				onClick={uploadFile}
				disabled={uploading || !file}
				className={`${styles.uploadBtn} ${className || ''}`}
			>
				{uploading ? 'Uploading...' : buttonLabel}
			</button>
		</div>
	);
};

export default UploadImage;