export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
};

export const isValidPassword = (password) => {
    return password.length >= 8; //8자 이상
}

