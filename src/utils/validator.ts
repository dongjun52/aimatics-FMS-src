/**
 * @author Tony
 * @description validation 판별을 위한 utils
 */

/**
 * Dollar 포맷 체크 함수 (USD Currency)
 * @param value
 * @returns boolean
 */
export const isValidDollarFormat = (value: string): boolean => {
  /*
    /^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{0,2})?$/;
    Matches	$1,234,567.89 | 1234567.89 | 1,000.5 | $9.99 
    Non-Matches	$1,2345,67.89 | $1234,345,678.0 | 0
   */

  const currencyPattern =
    /^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{0,2})?$/;
  const regex = new RegExp(currencyPattern);

  return regex.test(value);
};

/**
 * 정수 입력 포맷 체크 함수
 * @param value
 * @returns boolean
 */
export const isValidInteger = (value: string): boolean => {
  // const numberPattern = /^(?:\d{1,3}(?:,\d{3})*|\d+)?$/;
  const numberPattern = /^[0-9]+$/;
  const regex = new RegExp(numberPattern);

  return regex.test(value);
};

/**
 * 정수 및 소수점 포함 숫자 체크 함수
 * 10.1 / 0.0 / 50.12
 * @param value
 * @returns boolean
 */
export const isValidNumberDecimal = (value: string): boolean => {
  const pattern = /^[-]?\d+(?:[.]\d+)?$/;
  return pattern.test(value);
};

/**
 * 이메일 형식 판별 함수
 * @param email
 * @returns boolean
 */
export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

/**
 * 소수 판별 함수
 * @param num
 * @returns boolean
 */
export const isDecimal = (num: Number | any): boolean => {
  if (num === 2) return true;

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};
