export const LOGIN_MESSAGE = {
  CHECK_LOGIN_INFO: 'Please check your ID and password.',
  WRONG_PASSWORD: 'Please check your password.',
  NOT_FOUND_USER: 'User information does not exist.',
  CONTACT_ADMIN: 'Please contact the administrator.',
} as const;

export const LOGIN_RESPONSE_MESSAGE = {
  NOT_FOUND_USER: '유저 정보 없음',
  WRONG_PASSWORD: '잘못된 비밀 번호',
} as const;
