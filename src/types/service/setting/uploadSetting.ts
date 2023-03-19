import { EventKey } from '@/types/common/eventType';
import { SettingKey } from '../device/deviceSetting';

/**
 * Upload Setting Group 목록 조회
 */
export interface FetchOndemandGroupsPayload {
  variables: {
    partnerIds: number[];
    pageNo: number;
    pageSize: number;
  };
}

export interface FetchOndemandGroupsResponse {
  getOndemandGroupInfoList: {
    size: number;
    totalPages: number;
    totalElements: number;
    content: Array<{
      companyName: string;
      deviceCnt: number;
    }>;
  };
}

export interface OndemandGroupsContent {
  key: number;
  companyName: string;
  deviceCnt: number;
}

/**
 * Ondemand Setting 정보 조회
 */
export interface FetchOndemandSetingPayload {
  variables: {
    partnersId: number;
    partitionType: 0;
  };
}

export interface FetchOndemandSettingResponse {
  readOndemandPartset: {
    status: string;
    message: string;
    success: boolean;
    result: boolean;
    ondemandPartset: Record<EventKey, 0 | 1>;
  };
}

export interface OndemandSetting {
  type: EventKey;
  name: string;
  isUse: boolean;
}

/**
 * Ondemand Setting 수정
 */
export type UpdateOndemandSettingPayload = OndemandSetting[];
export type OndemandParams = Record<EventKey, 0 | 1>;

export interface UpdateOndemandSettingVariables extends OndemandParams {
  partnersId: number;
  partitionType: 0 | 1;
}

export interface UpdateOndemandSettingResponse {
  registOndemandPartset: {
    status: '200';
    message: string;
    success: boolean;
    result: boolean;
  };
}
