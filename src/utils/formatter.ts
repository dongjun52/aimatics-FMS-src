/**
 * @author Tony
 * @description 포맷 변환 관련 함수정의 Util
 */

/**
 * 전화번호 Dash 포맷 적용 함수
 * @param val
 * @returns 포맷 적용된 값
 */
export const addPhoneNumberDashes = (val: string): string => {
  const value = val.replace(/\D[^\.]/g, '');
  return value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
};

/**
 * Dash 제거 함수
 * @param val
 * @returns Dash 제거된 값
 */
export const removeDashes = (val: string): string => {
  return val.replaceAll('-', '');
};

/**
 * 정수에 대한 천단위 콤마 적용 함수
 * @param val
 * @returns 콤마가 적용된 string
 */
export const applyNumberComma = (v: string): string => {
  return v.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 소수제외 천단위 콤마 적용 함수
 * @param val
 * @returns string
 */
export const addNumberComma = (val: number | string): string => {
  const value = typeof val === 'string' ? Number(val) : val;
  let str = value.toString().split('.');

  str[0] = str[0].replace(/[^-\.0-9]/g, '').replace(/(.)(?=(\d{3})+$)/g, '$1,');
  let fmStr = str.join('.');
  return fmStr.replace(
    /[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\|ㄱ-ㅎ|ㅏ-ㅣ-ㅢ|가-힣|a-z|A-Z]/g,
    ''
  );
};

/**
 * 달러에 대한 콤마 적용 함수 ex) 150.20
 * @param val
 * @returns 콤마 적용된 달러 포맷
 */
export const applyDollarComma = (val: number | string): string => {
  const parts =
    typeof val === 'number' ? val.toString().split('.') : val.split('.');
  const left = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  let right = '';

  if (parts[1]) {
    if (parts[1].length > 1) {
      right = '.' + parts[1];
    } else {
      right = '.' + parts[1] + '0';
    }
  } else {
    right = '.00';
  }

  return left + right;
};
