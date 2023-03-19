/**
 * localStorage FMS 토큰 리턴
 * @returns token
 */
export function getToken(): string | null {
  return localStorage.getItem('fms_token');
}

/**
 * localStorage FMS 토근 제거
 */
export function removeToken(): void {
  localStorage.removeItem('fms_token');
}
