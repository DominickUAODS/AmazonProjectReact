// email filter
export function emailFilter(email: string): string | undefined {
    if (!email.includes('@') || !email.includes('.')) {
        return 'Wrong or invalid email address';
    }
    return undefined;
}