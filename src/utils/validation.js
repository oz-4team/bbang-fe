/** 이메일 형식 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
};
/** 비밀번호 형식(8자이상) */
export const isValidPassword = (password) => {
    return password.length >= 8; 
}

/** 000-000-0000 */
export const isValidPhone = (phone) => { 
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    return phoneRegex.test(phone); 
};


