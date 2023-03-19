import { UserByResponse } from './../../common/auth';
/**
 * Device List 조회
 */
export interface DeviceListContent {
  serial: string;
  deviceModel: string;
  lastLogUpdate: string;
  updatedAt: string;
  status: number;
}

// export type DeviceList = DeviceListContent[];

export interface FetchDeviceListResponse {
  getDeviceInfoList: {
    content: Array<{
      devicesId: number | string;
      serial: string;
      deviceModelName: string;
      partners: {
        partnersId: number | string;
        partnersName: string;
      };
      devices: {
        lastLogDate: string;
      };

      installerRegistrations: {
        updatedAt: string;
      };

      isConnected: number;
    }>;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface FetchDeviceListPayload {
  variables: {
    partnersIds: number[];
    keyword: string;
    pageNum: number;
    pageSize: number;
    condition: {
      sort: {
        order: string;
        by: boolean | string;
      } | null;
      filters: Array<{
        name: string;
        valueList?: string[];
        valueIntList?: number[];
      }> | null;
    };
  };
}

/**
 * Device 정보 조회
 */
export interface FetchDevicePayload {
  variables: {
    serial: string;
  };
}

export interface FetchDeviceResponse {
  getDeviceInfoData: {
    devicesId: number;
    serial: string;
    deviceModelName: 'R8' | 'R9';
    partners: {
      partnersId: number;
      partnersName: string;
    };
    devices: {
      lastLogDate: string;
    };
    installerRegistrations: {
      updatedAt: string;
    };
    isConnected: 0 | 1; // 0: OFF, 1: ON
  };
}

export interface DeviceDetail {
  devicesId: number;
  serial: string;
  deviceModelName: 'R8' | 'R9';
  lastLogDate: string;
  updatedAt: string;
  isConnected: boolean;
}
