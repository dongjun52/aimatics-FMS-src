import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState } from '@/store';
import graphqlClient from '@/utils/graphql';
import { menus } from '@/constants/common';

export interface IMenu {
  key: number;
  title: string;
  path: string;
  isSelected: boolean;
  pathName: string;
  d: string;
}

export interface CommonStoreState {
  menus: IMenu[];
  isLoading: boolean;
  isActiveStickyMenu: boolean;
}

const state = (): CommonStoreState => ({
  menus,
  isLoading: false,
  isActiveStickyMenu: false,
});

const getters: GetterTree<CommonStoreState, RootState> = {};

export enum MutationTypes {
  SET_SPINNER_STATUS = 'SET_SPINNER_STATUS',
  SET_IS_ACTIVE_STICKY_MENU = 'SET_IS_ACTIVE_STICKY_MENU',
}

const mutations: MutationTree<CommonStoreState> = {
  [MutationTypes.SET_IS_ACTIVE_STICKY_MENU](state, payload) {
    state.isActiveStickyMenu = payload;
  },
  [MutationTypes.SET_SPINNER_STATUS](
    state: CommonStoreState,
    payload: boolean
  ) {
    state.isLoading = payload;
  },
};

export enum CommonTypes {}

const actions: ActionTree<CommonStoreState, RootState> = {};

export const common: Module<CommonStoreState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
