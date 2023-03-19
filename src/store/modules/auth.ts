import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState } from '@/store/index';
import graphqlClient from '@/utils/graphql';
import router from '@/router/index';
import { LOGIN_QUERY, USER_BY_TOKEN_QUERY } from '@/graphql/auth';
import {
  AUTHORITY,
  authorityCodeDefine,
  crmAuthorityCodeDefine,
  FetchUserByTokenQueryResponse,
  FetchUserPayload,
  FetchUserResponse,
  IUser,
  UserByResponse,
} from '@/types/common/auth';
import { ILocale, IPartner } from '@/types/common/common';
import { Locale, ROUTE_NAMES } from '@/constants/common';
import { LOGIN_MESSAGE, LOGIN_RESPONSE_MESSAGE } from '@/constants/auth';

export const MODULE_PATH = 'auth/';

export interface AuthStoreState {
  user: IUser;
  isLoading: boolean;
  partners: IPartner[];
  isLoginEnter: boolean;
}

const state = (): AuthStoreState => ({
  user: defaultUser(),
  isLoading: false,
  partners: [],
  isLoginEnter: false,
});

const getters: GetterTree<AuthStoreState, RootState> = {
  defaultPartnerId(state): number {
    return state.partners[0].partnersId;
  },
  partnerIdsByAuth(state): number[] {
    let partnerIds: number[];
    const authority: string = getUserAuthority(state.user.authCode);

    if (authority === AUTHORITY.AA) {
      partnerIds = [];
    } else if (authority === AUTHORITY.AM) {
      partnerIds = state.user.partnerIds;
    } else {
      partnerIds = [state.user.partnersId];
    }

    return partnerIds;
  },
};

export enum MutationTypes {
  SET_USER = 'SET_USER',
  OUT_USER = 'OUT_USER',
  SET_PARTNERS = 'SET_PARTNERS',
}

const mutations: MutationTree<AuthStoreState> = {
  [MutationTypes.SET_USER](state: AuthStoreState, payload: UserByResponse) {
    const authority: IUser['authority'] = getUserAuthority(payload.authCode);
    const partnerIds: IUser['partnerIds'] = [];

    payload.partnerses.forEach((partner) => {
      partnerIds.push(partner.partnersId);
    });

    // s3에 정상적으로 등록된 Image에 대한 판별
    const isExistProfile: boolean =
      payload.profileUrl?.includes('.jpg') ||
      payload.profileUrl?.includes('.png');

    // 사용자 locale 정보 설정 (추후 다국어처리 논의 후 재검토)
    let locale = navigator.language as ILocale;
    if (payload.locale) {
      locale = payload.locale === 'ko' ? Locale.KO : Locale.US;
    }

    // set 'user'
    state.user = {
      ...payload,
      authority,
      isAdmin: authority !== AUTHORITY.SU,
      isMaster: authority === AUTHORITY.AA,
      partnerIds,
      profileUrl: isExistProfile
        ? payload.profileUrl
        : '/images/common/driver_profile2.png', // s3에 정상등록되지 않은 이미지일 경우, 기본 이미지
      locale,
    };

    state.isLoginEnter = true;

    setStorageUser(payload);
    console.log('[user] ', state.user);
  },
  [MutationTypes.OUT_USER](state: AuthStoreState): void {
    state.user = defaultUser();
    localStorage.clear();
    state.isLoginEnter = false;

    router.push({
      name: ROUTE_NAMES.LOGIN,
    });
  },
  [MutationTypes.SET_PARTNERS](
    state: AuthStoreState,
    payload: IPartner[]
  ): void {
    const partners = payload.slice();

    if (partners.length > 1) {
      partners.unshift({
        partnersId: 0,
        partnersName: '전체',
      });
    }

    state.partners = partners;
  },
};

export enum ActionTypes {
  FETCH_USER = 'FETCH_USER',
  FETCH_USER_BY_TOKEN = 'FETCH_USER_BY_TOKEN',
  SIGNUP_USER = 'SIGNUP_USER',
}

const actions: ActionTree<AuthStoreState, RootState> = {
  async [ActionTypes.FETCH_USER](
    { state, commit },
    payload: FetchUserPayload
  ): Promise<{ success: boolean; message: string }> {
    state.isLoading = true;

    try {
      const { data } = await graphqlClient.mutate<FetchUserResponse>({
        mutation: LOGIN_QUERY,
        variables: payload.variables,
      });

      const response = data?.gqlLogin;

      if (response) {
        let { data, success, message } = response;

        if (success) {
          commit(MutationTypes.SET_USER, data);
          // commit(MutationTypes.SET_PARTNERS, user.partnerses);
        } else {
          if (message === LOGIN_RESPONSE_MESSAGE.NOT_FOUND_USER) {
            message = LOGIN_MESSAGE.NOT_FOUND_USER;
          } else if (message === LOGIN_RESPONSE_MESSAGE.WRONG_PASSWORD) {
            message = LOGIN_MESSAGE.WRONG_PASSWORD;
          }
        }

        state.isLoading = false;

        return {
          success,
          message,
        };
      } else {
        // state.isLoading = false;

        return {
          success: false,
          message: LOGIN_MESSAGE.CONTACT_ADMIN,
        };
      }
    } catch (err) {
      // state.isLoading = false;

      return {
        success: false,
        message: LOGIN_MESSAGE.CONTACT_ADMIN,
      };
    } finally {
      state.isLoading = false;
    }
  },
  async [ActionTypes.FETCH_USER_BY_TOKEN](
    { state, commit, dispatch },
    payload: IUser['loginToken']
  ): Promise<{ success: boolean; message: string }> {
    try {
      const { data } = await graphqlClient.query<FetchUserByTokenQueryResponse>(
        {
          query: USER_BY_TOKEN_QUERY,
          variables: {
            loginToken: payload,
          },
          fetchPolicy: 'network-only',
        }
      );

      const response = data.findByLoginToken;
      const { success, message, data: userData } = response;

      if (success && userData) {
        commit(MutationTypes.SET_USER, userData);
        commit(MutationTypes.SET_PARTNERS, userData.partnerses);
      } else {
        return {
          success,
          message: LOGIN_MESSAGE.NOT_FOUND_USER,
        };
      }
    } catch (err) {
      return { success: false, message: LOGIN_MESSAGE.CONTACT_ADMIN };
    }
  },
};

/**
 * localStorage 유저 정보 세팅
 * @param user
 */
const setStorageUser = (user: UserByResponse): void => {
  let locale: ILocale = Locale.US;

  if (user.locale === 'ko') {
    locale = Locale.KO;
  }

  localStorage.setItem('fms_token', user.loginToken);
  localStorage.setItem('email', user.email);
  localStorage.setItem('name', user.name);
  localStorage.setItem('locale', locale);
};

/**
 * authCode에 따른 권한 판별
 * @param authCode
 * @returns
 */
const getUserAuthority = (authCode: IUser['authCode']): IUser['authority'] => {
  return authorityCodeDefine[authCode];
};

const defaultUser = (): IUser => {
  const locale = navigator.language as ILocale;

  return {
    accountsId: 0,
    authCode: '',
    corporationId: null,
    corporationName: '',
    corporationNumber: 0,
    creatorId: null,
    description: '',
    email: '',
    loginFailCnt: 0,
    loginToken: '',
    message: '',
    name: '',
    partnersId: 0,
    partnersName: '',
    password: null,
    phone: '',
    statusCode: null,
    termAgreeYn: '',
    partnerses: [],
    authority: '',
    isAdmin: false,
    assignedTask: '',
    corporationPhone: '',
    department: '',
    partnerIds: [],
    profileUrl: '',
    lastLoginAt: '',
    locale,
    isMaster: false,
  };
};

export const auth: Module<AuthStoreState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
