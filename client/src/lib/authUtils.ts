import { getAuthUrls } from './config';

export function isUnauthorizedError(error: Error): boolean {
  return /^401: .*Unauthorized/.test(error.message);
}

export function redirectToLogin() {
  const { login } = getAuthUrls();
  window.location.href = login;
}

export function redirectToLogout() {
  const { logout } = getAuthUrls();
  window.location.href = logout;
}