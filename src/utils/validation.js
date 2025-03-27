export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
};

export const isValidPassword = (password) => {
    return password.length >= 8; //8자 이상
}

//관리자 권한 페이지에서 사용할 함수
export const isValidPhone = (phone) => { 
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    return phoneRegex.test(phone); 
};


