import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';
import store from '@/store/index';
import { LAYOUT_TYPE } from '@/types/common/common';
import { ROUTE_NAMES } from '@/constants/common';
import { getToken } from '@/helpers/auth';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ROUTE_NAMES.ROOT,
    redirect: (to) => {
      const token = getToken();

      if (token) {
        return '/devices';
      } else {
        return '/login';
      }
    },
  },
  {
    path: '/login',
    name: ROUTE_NAMES.LOGIN,
    component: () => import('@/views/LoginView.vue'),
    meta: {
      authRequired: false,
      layout: LAYOUT_TYPE.LOGIN,
    },
  },
  {
    path: '/devices',
    name: ROUTE_NAMES.DEVICES,
    component: () => import('@/views/DeviceListView.vue'),
    meta: {
      authRequired: true,
      layout: LAYOUT_TYPE.FMS,
    },
  },
  {
    path: '/devices/detail',
    redirect: '/devices',
    name: ROUTE_NAMES.DEVICE_DETAIL,
    component: () => import('@/views/DeviceDetailView.vue'),
    props: true,
    meta: {
      authRequired: true,
      layout: LAYOUT_TYPE.FMS,
    },
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const { query, name } = to;

      switch (name) {
        case ROUTE_NAMES.PLAYLIST:
        case ROUTE_NAMES.STILLCUT:
        case ROUTE_NAMES.DCA:
        case ROUTE_NAMES.DEVICE_SETTING:
          if (!query.serial) {
            next('/devices');
          } else {
            next();
          }
        default:
          next();
          break;
      }
    },
    children: [
      {
        path: 'playlist',
        name: ROUTE_NAMES.PLAYLIST,
        component: () =>
          import('@/components/DeviceDetail/components/PlayList.vue'),
      },
      {
        path: 'stillcut',
        name: ROUTE_NAMES.STILLCUT,
        component: () =>
          import('@/components/DeviceDetail/components/StillCut.vue'),
      },
      {
        path: 'dca',
        name: ROUTE_NAMES.DCA,
        component: () => import('@/components/DeviceDetail/components/DCA.vue'),
      },
      {
        path: 'devicesetting',
        name: ROUTE_NAMES.DEVICE_SETTING,
        component: () =>
          import('@/components/DeviceDetail/components/DeviceSetting.vue'),
      },
    ],
  },
  {
    path: '/overview',
    name: ROUTE_NAMES.OVERVIEW,
    component: () => import('@/views/MapOverviewView.vue'),
    meta: {
      authRequired: true,
      layout: LAYOUT_TYPE.FMS,
    },
  },
  {
    path: '/setting/upload',
    name: ROUTE_NAMES.UPLOAD_SETTING,
    component: () => import('@/views/UploadSettingView.vue'),
    meta: {
      authRequired: true,
      layout: LAYOUT_TYPE.FMS,
    },
  },
  //TODO
  // {
  //   path: '/setting/group',
  //   name: ROUTE_NAMES.GROUP_SETTING,
  //   component: () => import('@/views/GroupSettingView.vue'),
  //   meta: {
  //      authRequired: true,
  //     layout: LAYOUT_TYPE.FMS,
  //   },
  // },
  // 에러 페이지
  {
    path: '/:pathMatch(.*)*',
    name: 'Error404',
    component: () => import('@/views/Error404View.vue'),
    meta: {
      authRequired: false,
      layout: LAYOUT_TYPE.LOGIN,
    },
  },
];
