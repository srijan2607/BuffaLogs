export const BASE_URL = `http://localhost:8000`;
export const AUTH_URL = `${BASE_URL}/authentication`;
export const LOGIN_URL = `${AUTH_URL}/login`;
export const LOGOUT_URL = `${AUTH_URL}/logout`;
export const REGISTER_URL = `${AUTH_URL}/register`;
export const ME_URL = `${AUTH_URL}/me`;

export const SESSION_TIMEOUT = Number(process.env.NEXT_PUBLIC_SESSION_TIMEOUT) || 15 * 60 * 1000;
export const SESSION_WARNING_TIME = Number(process.env.NEXT_PUBLIC_SESSION_WARNING_TIME) || 1 * 60 * 1000;
