export function getPublicIdFromUrl(url: string): string | null {
	try {
		// Разбиваем строку по "/upload/"
		const parts = url.split("/upload/");
		if (parts.length < 2) return null;

		// Берём вторую часть (после /upload/)
		const publicIdWithExt = parts[1].split("/").pop(); // "default.jpg"
		if (!publicIdWithExt) return null;

		// Убираем расширение (.jpg, .png и т.п.)
		return publicIdWithExt.split(".")[0];
	} catch {
		return null;
	}
}
