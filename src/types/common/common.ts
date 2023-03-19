// export { CommonStoreState } from '@/store/modules/common/common';
import { reactive } from 'vue';

/**
 * locale
 */
export type ILocale = 'ko-KR' | 'en-US';

/**
 * 공통 layout
 */

export const LAYOUT_TYPE = {
  LOGIN: 'LoginLayout',
  DEFAULT: 'DefaultLayout',
  FMS: 'FMSLayout',
  CRM: 'CRMLayout',
} as const;

/**
 * 공통 TopBar
 */
export interface ITopBarAlarm {
  diffAgo: string;
  confirmNCount: number;
}

/**
 * 공통 Slider
 */
export interface ISlider {
  name: string;
  title: string;
  context: string;
}

/**
 * 공통 링크복사
 */
export interface FetchLinkCodeVariables {
  accidentGroup: string;
}

export interface FetchLinkCodeResponse {
  getLinkCode: string;
}

export interface FetchLinkCodeState {
  data: string | undefined;
}

/**
 * 공통 Partner
 */
export interface IPartner {
  partnersId: number;
  partnersName: string;
}

export interface ICorporation {
  corporationId: number;
  corporationName: string;
  corporationNumber: string;
}

/**
 * 공통 Menu
 */
export interface MenuAuth {
  isHoverFocus: boolean;
  menuAuthId: number;
  authCode: string;
  authValue: string;
}

interface ChildMenuByResponse {
  menuId: number;
  menuName: string;
  parentMenuId: number;
  menuUrl: string;
  menuOrder: number;
}

export interface IMenu extends MenuAuth {
  menu: {
    saftyYN: any;
    economyYn: any;
    serviceYn: any;
    menuId: number;
    menuName: string;
    menuUrl: string;
    childMenus: ChildMenuByResponse[];
    isSelected: boolean;
    isHoverFocus?: boolean;
    isAdminMenu: boolean;
  };
}

/**
 * 공통 Code
 */
export interface FetchEventCodeResponse {
  codeList: Array<{
    codeDetail: string;
    codeGroup: string;
    codeName: string;
    tempVal1: string;
    tempVal2: string;
  }>;
}

export interface IEventCode {
  codeGroup: string;
  codeDetail: string;
  codeName: string;
  tempVal1: string;
  tempVal2: string;
}

export const CODE_GROUP_TYPES = {
  AUTH: 'AUTH', //	권한코드
  BUSI: 'BUSI', //	업종
  CRTY: 'CRTY', //	데이터생성타입
  SDTY: 'SDTY', //	배차표타입
  STAT: 'STAT', //	상태코드
  SVTY: 'SVTY', //	서비스타입
  BNTY: 'BNTY', //	배너종류
  FUEL: 'FUEL', // 유종타입
  DTST: 'DTST', // 진행상태
} as const;
