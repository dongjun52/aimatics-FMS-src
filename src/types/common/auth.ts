import { ILocale } from '../common/common';
import { IPartner } from './common';

/**
 * User 정보 조회
 */
export interface IUser {
  accountsId: number;
  authCode: string;
  corporationId: number | null;
  corporationName: string;
  corporationNumber: number;
  creatorId: null;
  description: string;
  email: string;
  loginFailCnt: number;
  loginToken: string;
  message: string;
  name: string;
  partnersId: number;
  partnersName: string;
  password: null;
  phone: string;
  // serviceType: null;
  statusCode: null;
  termAgreeYn: string;
  partnerses: IPartner[];

  authority: string;
  isAdmin: boolean;
  assignedTask: string;
  corporationPhone: string;
  department: string;

  partnerIds: number[];

  profileUrl: string;
  lastLoginAt: string; // 마지막 로그인 시간
  locale: ILocale; // 언어 정보 (ko, en)
  isMaster: boolean; // AA 권한
}

export interface UserByResponse {
  accountsId: number;
  authCode: string;
  corporationId: number | null;
  corporationName: string;
  assignedTask: string;
  corporationPhone: string;
  department: string;
  corporationNumber: number;
  creatorId: null;
  description: string;
  email: string;
  loginFailCnt: number;
  loginToken: string;
  message: string;
  name: string;
  partnersId: number;
  partnersName: string;
  password: null;
  phone: string;
  // serviceType: null;
  statusCode: null;
  termAgreeYn: string;
  partnerses: IPartner[];

  profileUrl: string;
  lastLoginAt: string; // 마지막 로그인 시간
  locale: 'ko' | 'en'; // 언어 정보 (ko, en)
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface FetchUserPayload {
  variables: LoginInput;
}

export interface FetchUserResponse {
  gqlLogin: {
    data: UserByResponse;
    message: 'success' | string;
    status: '200' | null;
    success: boolean;
  };
}

/**
 * Token 으로 User 정보 조회
 */
export interface FetchUserByTokenQueryResponse {
  findByLoginToken: Response;
}

export interface Response {
  data: UserByResponse;
  message: string;
  status: string | null;
  success: boolean;
}

export type AuthorityCode = {
  // https://soopdop.github.io/2020/12/01/index-signatures-in-typescript/
  [index: string]: string;
  '330': string;
  '320': string;
  '310': string;
  '110': string;
};

export type CRMAuthorityCode = {
  [index: string]: string;
  '530': string;
  '520': string;
  '510': string;
};

export interface Authority {
  AA: string;
  AM: string;
  AU: string;
  SU: string;
}

export const AUTHORITY: Authority = {
  AA: 'AA',
  AM: 'AM',
  AU: 'AU',
  SU: 'SU',
} as const;

export const authorityCodeDefine: AuthorityCode = {
  '330': AUTHORITY.AA, // admin-admin
  '320': AUTHORITY.AM, // admin-manager
  '310': AUTHORITY.AU, // admin-user
  '110': AUTHORITY.SU, // service-user
} as const;

export const crmAuthorityCodeDefine: CRMAuthorityCode = {
  '530': AUTHORITY.AA, // admin-admin
  '520': AUTHORITY.AM, // admin-manager
  '510': AUTHORITY.AU, // admin-user
} as const;
