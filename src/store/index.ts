import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { auth, AuthStoreState } from '@/store/modules/auth';
import { common, CommonStoreState } from '@/store/modules/common';

//FMS Serice
import { dca, DcaState } from '@/store/modules/service/device/dca';
import {
  device,
  DeviceStoreState,
} from '@/store/modules/service/device/device';
import {
  deviceSetting,
  DeviceSettingStoreState,
} from '@/store/modules/service/device/deviceSetting';
import {
  eventVideoList,
  EventVideoListState,
} from '@/store/modules/service/device/eventVideo';
import {
  UploadSetttingStoreState,
  uploadSetting,
} from '@/store/modules/service/setting/uploadSetting';
import type { StillCutStoreState } from '@/store/modules/service/device/stillCut';
import { stillCut } from '@/store/modules/service/device/stillCut';
import type { MapStoreState } from '@/store/modules/service/map/map';
import { map } from '@/store/modules/service/map/map';
import type { PlayerStoreState } from '@/store/modules/service/common/player';
import { player } from '@/store/modules/service/common/player';

export interface RootState {
  common: CommonStoreState;
  auth: AuthStoreState;
  map: MapStoreState;
  stillCut: StillCutStoreState;
  device: DeviceStoreState;
  deviceSetting: DeviceSettingStoreState;
  eventVideoList: EventVideoListState;
  player: PlayerStoreState;
  dca: DcaState;
  uploadSetting: UploadSetttingStoreState;
}

const plugins = [
  createPersistedState({
    paths: ['auth'],
  }),
];

const modules = {
  common,
  auth,
  map,
  stillCut,
  device,
  deviceSetting,
  eventVideoList,
  player,
  dca,
  uploadSetting,
};

export default createStore({
  modules,
  plugins,
});
