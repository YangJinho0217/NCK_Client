const AUTH_KEY = 'nck_authenticated';

export function setAuth() {
  localStorage.setItem(AUTH_KEY, 'true');
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}
