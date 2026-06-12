export const API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || "";

export const ENDPOINTS = {
  login: `${API_URL}/login`,
  logout: `${API_URL}/logout`,
  change_password: `${API_URL}/auth/change-password`,
  me: `${API_URL}/me`,
  portals: `${API_URL}/registered-apps"`,
};
