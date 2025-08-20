// cloudinarySignature.ts
import CryptoJS from 'crypto-js';

export interface CloudinaryParams {
	[key: string]: string | number;
}

/**
 * Генерация подписи для Cloudinary
 * @param params - параметры для подписи (без file, cloud_name, api_key)
 * @param apiSecret - секретный ключ Cloudinary
 * @returns подпись (SHA-1)
 */
export function generateCloudinarySignature(
	params: CloudinaryParams,
	apiSecret: string
): string {
	const sortedKeys = Object.keys(params).sort();
	const serialized = sortedKeys.map(key => `${key}=${params[key]}`).join('&');
	const stringToSign = serialized + apiSecret;
	const hash = CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex);
	return hash;
}
