import { ActionTree, Module, MutationTree } from 'vuex';
import { RootState } from '@/store';
import graphqlClient from '@/utils/graphql';
import {
  FORMAT_DEVICE,
  GET_DEVICE_SETTING,
  GET_DEVICE_STATUS,
  SET_CALIBRATION,
  UPDATE_DEVICE_DASH_CAM,
  UPDATE_DEVICE_EDGE_AI,
  UPDATE_DEVICE_GENERAL,
  UPDATE_DEVICE_SMARTEVENT,
  UPDATE_WIFI_MODE,
} from '@/graphql/service/device/deviceSetting';
import {
  DeviceSttings,
  FetchDeviceSettingPayload,
  FetchDeviceSettingResponse,
  FetchDeviceStatusPayload,
  FetchDeviceStatusResponse,
  IDeviceStatus,
  PanelCategory,
  ResetWifiPayload,
  ResetWifiResponse,
  ResponseSettings,
  SetCalibrationPayload,
  SettingByCategory,
  SettingDashcam,
  SettingEdge,
  SettingGeneral,
  SettingKey,
  SettingSmartevent,
  SubCameraMessageCode,
  SubCameraStatusRow,
  UpdateDeviceSettingPayload,
  UpdateDeviceSettingVariables,
  SetCalibrationResponse,
  FormatMemoryResponse,
  FormatMemoryPayload,
} from '@/types/service/device/deviceSetting';
import {
  DEFINE_CATEGORY,
  DEFINE_SETTINGS,
  GROUP,
} from '@/constants/deviceSetting';
import { LOGIN_MESSAGE } from '@/constants/auth';

export const MODULE_PATH = 'deviceSetting/';

export interface DeviceSettingStoreState {
  isLoading: boolean;
  deviceStatus: IDeviceStatus;
  deviceSettings: DeviceSttings;
  panelCategory: PanelCategory[];
}

const state = (): DeviceSettingStoreState => ({
  isLoading: false,
  deviceStatus: defaultDeviceStatus(),
  deviceSettings: defaultDeviceSetting(),
  panelCategory: defaultPanelCategory(),
});

export enum MutationTypes {
  SET_DEVICE_STATUS = 'SET_DEVICE_STATUS',
  SET_DEVICE_SETTING = 'SET_DEVICE_SETTING',
}

const mutations: MutationTree<DeviceSettingStoreState> = {
  [MutationTypes.SET_DEVICE_SETTING](state, payload: ResponseSettings) {
    const settings = defaultDeviceSetting();
    const panelCategory = defaultPanelCategory();

    Object.entries(payload).map(([key, value]) => {
      if (value) {
        const settingKey = key as SettingKey;

        if (DEFINE_SETTINGS[settingKey]) {
          const { name, category, group, options } =
            DEFINE_SETTINGS[settingKey];
          const groups = settings[category];
          const groupIndex = groups.findIndex((row) => group === row.group);
          const isCombobox = value.range.length > 0;

          // 화면에 사용되는 데이터 구조 정의
          groups[groupIndex].fields.push({
            key: settingKey,
            name,
            value: value.value === null ? value.defaultValue : value.value,
            defaultValue: value.defaultValue,
            unit: options.unit || '',
            options: isCombobox
              ? value.range.map((r: number, i: number) => {
                  const { labels, unit } = options;
                  // custom or 응답 range 로 label 세팅
                  let label = labels ? labels[i] : r.toString();
                  label = unit ? label + ' ' + unit : label;

                  return {
                    key: settingKey,
                    value: r,
                    label,
                  };
                })
              : null,
          });
        }
      }
    });

    // 정의된 데이터 구조
    panelCategory.map((panel) => {
      const category = panel.category;
      panel.data = settings[category];
    });

    console.log('panelCategory ', panelCategory);

    state.deviceSettings = settings;
    state.panelCategory = panelCategory;
  },
  [MutationTypes.SET_DEVICE_STATUS](
    state,
    payload: FetchDeviceStatusResponse['getDeviceInfoData']
  ) {
    if (payload) {
      const getSubcameraInfo = (
        value: SubCameraMessageCode
      ): Pick<SubCameraStatusRow, 'text' | 'color'> => {
        return {
          text: value === 1 ? 'Success' : 'Failed',
          color: value === 1 ? 'ft_blue' : 'ft_red',
        };
      };

      const { devicesId, serial, devices, lastDca } = payload;
      let diskStatus;
      let subCamStatus;
      let deviceStatus;

      if (lastDca) {
        diskStatus = lastDca.diskStatus;
        subCamStatus = lastDca.subCamStatus;
        deviceStatus = lastDca.deviceStatus;
      } else {
        diskStatus = {
          sdStatus: {
            message: '-',
          },
          umsStatus: {
            message: '-',
          },
        };

        subCamStatus = {
          installMessage: null,
          attachMessage: null,
          recordMessage: null,
        };

        deviceStatus = [];
      }

      state.deviceStatus = {
        devicesId,
        serial,
        fwVersion: devices.firmwareVersion,
        isUpdateFW: devices.firmwareDownloaded ? true : false,
        stmVersion: devices.stmVersion,
        isUpdateSTM: devices.stmDownloaded ? true : false,
        wifiMode: devices.appSwitch ? 'AP' : 'Client',
        memoryStatus: diskStatus.sdStatus?.message,
        umsMemomryStatus: diskStatus.umsStatus?.message,
        subCameraStatus: {
          installation: {
            title: 'Installation',
            ...getSubcameraInfo(subCamStatus.installMessage),
          },
          attachment: {
            title: 'Attachment',
            ...getSubcameraInfo(subCamStatus.attachMessage),
          },
          recording: {
            title: 'Recording',
            ...getSubcameraInfo(subCamStatus.recordMessage),
          },
        },
        errorCodes: deviceStatus.length
          ? deviceStatus.map((d) => d.message)
          : ['-'],
      };
    }
  },
};

interface ReturnType {
  success: boolean;
  message: string;
}

export enum ActionTypes {
  FETCH_DEVICE_STATUS = 'FETCH_DEVICE_STATUS',
  FETCH_DEVICE_SETTING = 'FETCH_DEVICE_SETTING',
  UPDATE_DEVICE_SETTING = 'UPDATE_DEVICE_SETTING',
}

const actions: ActionTree<DeviceSettingStoreState, RootState> = {
  async [ActionTypes.UPDATE_DEVICE_SETTING](
    { state, rootState, dispatch, commit },
    payload: UpdateDeviceSettingPayload
  ): Promise<ReturnType> {
    const { panel, isInit } = payload;
    const settingParams = {} as SettingByCategory;

    // 정보 수정을 위한 setting parameter 세팅
    panel.data.map((group) => {
      group.fields.map((field) => {
        settingParams[field.key] = !isInit ? field.value : field.defaultValue;
      });
    });

    // 정보 수정을 위한 variables 세팅
    const variables: UpdateDeviceSettingVariables<SettingByCategory> = {
      serial: state.deviceStatus.serial,
      updaterId: rootState.auth.user.accountsId,
      ...settingParams,
    };

    // 카테고리에 따른 dispath 경로
    const firstUpperCaseCategory =
      panel.category.charAt(0).toUpperCase() + panel.category.slice(1);

    return dispatch('update' + firstUpperCaseCategory, variables);
  },
  async updateGeneral(
    {},
    variables: UpdateDeviceSettingVariables<SettingGeneral>
  ): Promise<ReturnType> {
    const {
      data: {
        saveDeviceSettingsGeneral: { success, message },
      },
    } = await graphqlClient.mutate({
      mutation: UPDATE_DEVICE_GENERAL,
      variables,
    });

    if (success) {
    }

    return {
      success,
      message,
    };
  },
  async updateDashCam(
    {},
    variables: UpdateDeviceSettingVariables<SettingDashcam>
  ): Promise<ReturnType> {
    const {
      data: {
        saveDeviceSettingsBB: { success, message },
      },
    } = await graphqlClient.mutate({
      mutation: UPDATE_DEVICE_DASH_CAM,
      variables,
    });

    return {
      success,
      message,
    };
  },
  async updateEdgeAI(
    { state },
    variables: UpdateDeviceSettingVariables<SettingEdge>
  ): Promise<ReturnType> {
    const {
      data: {
        saveDeviceSettingsAI: { success, message },
      },
    } = await graphqlClient.mutate({
      mutation: UPDATE_DEVICE_EDGE_AI,
      variables,
    });

    return {
      success,
      message,
    };
  },
  async updateSmartEvent(
    { state },
    variables: UpdateDeviceSettingVariables<SettingSmartevent>
  ): Promise<ReturnType> {
    const {
      data: {
        saveDeviceSettingsSE: { success, message },
      },
    } = await graphqlClient.mutate({
      mutation: UPDATE_DEVICE_SMARTEVENT,
      variables,
    });

    return {
      success,
      message,
    };
  },
  async [ActionTypes.FETCH_DEVICE_SETTING](
    { commit },
    payload: FetchDeviceSettingPayload
  ): Promise<void> {
    const {
      data: { getDeviceSetting },
    } = await graphqlClient.query<FetchDeviceSettingResponse>({
      query: GET_DEVICE_SETTING,
      variables: payload.variables,
      fetchPolicy: 'network-only',
    });

    if (getDeviceSetting) {
      commit(
        MutationTypes.SET_DEVICE_SETTING,
        getDeviceSetting.result.settings
      );
    }
  },
  async [ActionTypes.FETCH_DEVICE_STATUS](
    { state, commit },
    payload: FetchDeviceStatusPayload
  ): Promise<void> {
    state.isLoading = true;

    const {
      data: { getDeviceInfoData },
    } = await graphqlClient.query<FetchDeviceStatusResponse>({
      query: GET_DEVICE_STATUS,
      variables: payload.variables,
      fetchPolicy: 'network-only',
    });

    if (getDeviceInfoData) {
      commit(MutationTypes.SET_DEVICE_STATUS, getDeviceInfoData);
    }

    state.isLoading = false;
  },
  async resetWifi({ state }, payload: ResetWifiPayload): Promise<ReturnType> {
    try {
      const {
        data: { commandRestWifi },
      } = await graphqlClient.mutate<ResetWifiResponse>({
        mutation: UPDATE_WIFI_MODE,
        variables: payload.variables,
      });

      if (commandRestWifi) {
        const { success, message } = commandRestWifi;

        return {
          success,
          message,
        };
      } else {
        return {
          success: false,
          message: LOGIN_MESSAGE.CONTACT_ADMIN,
        };
      }
    } catch {
      return {
        success: false,
        message: LOGIN_MESSAGE.CONTACT_ADMIN,
      };
    }
  },
  async setCalibration(
    { state },
    payload: SetCalibrationPayload
  ): Promise<ReturnType> {
    try {
      const {
        data: { commandCalibration },
      } = await graphqlClient.mutate<SetCalibrationResponse>({
        mutation: SET_CALIBRATION,
        variables: payload.variables,
      });

      if (commandCalibration) {
        const { success, message } = commandCalibration;

        return {
          success,
          message,
        };
      } else {
        return {
          success: false,
          message: LOGIN_MESSAGE.CONTACT_ADMIN,
        };
      }
    } catch (err) {
      return {
        success: false,
        message: LOGIN_MESSAGE.CONTACT_ADMIN,
      };
    }
  },
  async formatMemory(
    { state },
    payload: FormatMemoryPayload
  ): Promise<ReturnType> {
    try {
      const {
        data: { formatDevice },
      } = await graphqlClient.mutate<FormatMemoryResponse>({
        mutation: FORMAT_DEVICE,
        variables: payload.variables,
      });

      if (formatDevice) {
        const { success, message } = formatDevice;

        return {
          success,
          message,
        };
      } else {
        return {
          success: false,
          message: LOGIN_MESSAGE.CONTACT_ADMIN,
        };
      }
    } catch (err) {
      return {
        success: false,
        message: LOGIN_MESSAGE.CONTACT_ADMIN,
      };
    }
  },
};

const defaultDeviceStatus = (): IDeviceStatus => {
  const subCameraStatusRow: SubCameraStatusRow = {
    title: '',
    text: 'Success',
    color: '',
  };

  return {
    devicesId: 0,
    serial: '',
    fwVersion: '',
    isUpdateFW: false,
    stmVersion: '',
    isUpdateSTM: false,
    wifiMode: 'Client',
    memoryStatus: '',
    umsMemomryStatus: '',
    subCameraStatus: {
      installation: subCameraStatusRow,
      attachment: subCameraStatusRow,
      recording: subCameraStatusRow,
    },
    errorCodes: [],
  };
};

const defaultPanelCategory = (): PanelCategory[] => {
  return [
    {
      title: 'Dimension / General Settings',
      category: DEFINE_CATEGORY.GENERAL,
      data: [],
    },
    {
      title: 'DashCam',
      category: DEFINE_CATEGORY.DASH_CAM,
      data: [],
    },
    {
      title: 'Edge AI / Driver Monitoring',
      category: DEFINE_CATEGORY.EDGE_AI,
      data: [],
    },
    {
      title: 'Smart Event',
      category: DEFINE_CATEGORY.SMART_EVENT,
      data: [],
    },
  ];
};

const defaultDeviceSetting = (): DeviceSttings => {
  return {
    [DEFINE_CATEGORY.GENERAL]: [
      {
        group: GROUP.INSTALL,
        fields: [],
      },
      {
        group: GROUP.OPX,
        fields: [],
      },
    ],
    [DEFINE_CATEGORY.DASH_CAM]: [
      {
        group: GROUP.BB,
        fields: [],
      },
    ],
    [DEFINE_CATEGORY.EDGE_AI]: [
      // {
      //   group: GROUP.LDW,
      //   fields: [],
      // },
      {
        group: GROUP.FCDA,
        fields: [],
      },
      // {
      //   group: GROUP.FCW,
      //   fields: [],
      // },
      {
        group: GROUP.SDA,
        fields: [],
      },
      {
        group: GROUP.VB,
        fields: [],
      },
      {
        group: GROUP.AA,
        fields: [],
      },
      // {
      //   group: GROUP.OSW,
      //   fields: [],
      // },
      {
        group: GROUP.DAW,
        fields: [],
      },
      {
        group: GROUP.DDW,
        fields: [],
      },
      // {
      //   group: GROUP.SBW,
      //   fields: [],
      // },
    ],
    [DEFINE_CATEGORY.SMART_EVENT]: [
      {
        group: GROUP['Smart Event (Front)'],
        fields: [],
      },
      {
        group: GROUP['Smart Event (Cabin)'],
        fields: [],
      },
    ],
  };
};

export const deviceSetting: Module<DeviceSettingStoreState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};
