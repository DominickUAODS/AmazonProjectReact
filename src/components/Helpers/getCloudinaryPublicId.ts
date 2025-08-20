export function getCloudinaryPublicId(url: string): string | undefined {
	const match = url.match(/\/([^/]+)\.[a-z0-9]+$/i);
	return match ? match[1] : undefined;
}