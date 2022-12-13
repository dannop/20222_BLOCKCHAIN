export const TOKEN_KEY = "@app-token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const login = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.clear();
};