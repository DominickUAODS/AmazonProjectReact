// email filter
export function emailFilter(email: string): string | undefined {
    if (!email.includes('@') || !email.includes('.')) {
        return 'Wrong or invalid email address';
    }
    return undefined;
}

// Проверка пароля
export function passwordFilter(password: string): string | undefined {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(password)) {
        return 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and be at least 8 characters long';
    }
    return undefined;
}