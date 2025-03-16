export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_NAVER_REDIRECT_URI}&response_type=code`;