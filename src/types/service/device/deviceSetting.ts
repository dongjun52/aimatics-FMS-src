/**
 * Device Status 조회
 */
export interface FetchDeviceStatusPayload {
  variables: {
    serial: string;
  };
}

/**
 * @reference https://docs.google.com/spreadsheets/d/1hEyUfNqjzx7g3Ff1KT0NCyT28ixpZyVX/edit#gid=1435576007
 */
type DeviceFaultState = '1' | '2' | '3' | '4' | '5' | '6'; // 고장 상태
export type SubCameraMessageCode = 0 | 1 | null;
export type SubCameraMassage = 'Success' | 'Failed';

export interface FetchDeviceStatusResponse {
  getDeviceInfoData: {
    devicesId: number;
    serial: string;
    deviceModelName: string;
    partners: {
      partnersId: number;
      partnersName: string;
    };
    devices: {
      lastLogDate: string;
      firmwareVersion: string;
      firmwareDownloaded: 0 | 1; // 0: 업데이트 없음 (null 인경우가 있음), 1: 업데이트 펌웨어가 있음,
      stmVersion: string;
      stmDownloaded: 0 | 1; // 0: 업데이트 없음 (null 인경우가 있음), 1 : 업데이트 펌웨어가 있음,
      appSwitch: 0 | 1; // 0: Client, 1: AP
    };
    installerRegistrations: {
      updatedAt: string;
    };
    isConnected: 0 | 1; // 0 : OFF, 1 : ON
    lastDca: {
      serialNumber: string;
      deviceStatus: Array<{
        symbolName: string;
        status: number;
        message: string;
        value: string;
      }>;
      subCamStatus: {
        status: number;
        value: string;
        recordMessage: SubCameraMessageCode; // 0: 오류, 1: 정상, null: 잘못된 상태 값
        attachMessage: SubCameraMessageCode; // 0: 오류, 1: 정상, null: 잘못된 상태 값
        installMessage: SubCameraMessageCode; // 0: 오류, 1: 정상, null: 잘못된 상태 값
      };
      diskStatus: {
        status: number;
        sdStatus: {
          value: string;
          message: string;
        };
        umsStatus: {
          value: string;
          message: string;
        };
      };
    };
  };
}

export interface SubCameraStatusRow {
  title: string;
  text: SubCameraMassage;
  color: string;
}

export interface IDeviceStatus {
  devicesId: number;
  serial: string;
  fwVersion: string; // Current F/W Ver.
  isUpdateFW: boolean;
  stmVersion: string; // Current Stm F/W Ver.
  isUpdateSTM: boolean;
  wifiMode: 'Client' | 'AP';
  memoryStatus: string;
  umsMemomryStatus: string;
  subCameraStatus: {
    installation: SubCameraStatusRow;
    attachment: SubCameraStatusRow;
    recording: SubCameraStatusRow;
  };
  errorCodes: string[];
}

/**
 * Device Setting 조회
 */
export interface FetchDeviceSettingPayload {
  variables: {
    serial: string;
  };
}

export type ResponseSettings = Record<
  SettingKey,
  {
    defaultValue: number;
    range: number[];
    title: string;
    value: number;
  }
>;

export interface FetchDeviceSettingResponse {
  getDeviceSetting: {
    status: string;
    message: string;
    success: boolean;
    result: {
      id: number;
      created_at: string;
      creator_id: string;
      updated_at: string;
      updater_id: number;
      creator_type: string;
      use_yn: string;
      settings: ResponseSettings;
    };
  };
}

export interface IDeviceSetting {}

export type SettingGeneralKey =
  | 'usInstall_CamHeight'
  | 'usInstall_CarWidth'
  | 'usInstall_BonnetLength'
  | 'usInstall_AttachedPos'
  | 'bDSM_DriverPos'
  | 'bSoundType'
  // | 'bitrateCam0'
  // | 'bitrateCam1'
  | 'bWatermark';

export type SettingDashcamKey =
  | 'usInfiniteEnable'
  | 'usEventEnable'
  | 'usStillCutEnable'
  | 'usMicInEnable'
  | 'usAccTriggerX'
  | 'usAccTriggerY'
  | 'usAccTriggerZ'
  | 'usAccTriggerX2'
  | 'usAccTriggerY2'
  | 'usAccTriggerZ2'
  | 'usAccLightTriggerX'
  | 'usAccLightTriggerY'
  | 'usAccLightTriggerZ'
  | 'usAccLightTriggerX2'
  | 'usAccLightTriggerY2'
  | 'usAccLightTriggerZ2'
  | 'usResolution'
  | 'usRearResolution'
  | 'usDisplaySpeedUnit'
  | 'usSndLanguage'
  | 'usSoundVolume'
  | 'usEvt_SndEffect'
  | 'usEvt_SndVoice';

export type SettingEdgeKey =
  // | 'usLdw_On'
  // | 'sLdw_SensL'
  // | 'sLdw_SensR'
  // | 'bLDW_KphWarn'
  | 'usBnw_On'
  // | 'usFcw_On'
  // | 'usFcw_TTCSense'
  | 'usHmw_On'
  | 'bHMW_KphWarn'
  | 'bHMW_WarningTTT1st'
  | 'usFcw_WarningStart'
  | 'usVb_On'
  | 'usVb_Sense'
  | 'bAAFunctionON'
  | 'bAA_SensLevel_StartSpeed'
  | 'bAA_SensLevel_tDriving'
  | 'bAA_SensLevel_tBreak'
  // | 'bOSWFunctionON'
  // | 'bOSW_StartSpeed'
  | 'bDAWFunctionON'
  | 'bDAW_SensLevel_Phone'
  | 'bDAW_Phone_KphWarn'
  | 'bDDWFunctionON'
  | 'bDDW_SensLevel_Distraction'
  | 'bDDW_Distraction_KphWarn'
  | 'bDDW_SensLevel_Drowsy'
  | 'bDDW_Drowsy_KphWarn';
// | 'bSBWFunctionON'
// | 'bSBW_SensLevel_Seatbelt'
// | 'bSBW_KphWarn';

export type SettingSmarteventKey =
  // | 'usSmartEventRecordState'
  | 'usSmartEventRecordSenseTailGating'
  | 'usSmartEventRecordSenseCollisionRisk'
  | 'usSmartEventRecordSenseRecklessDriving'
  | 'usSmartEventRecordSenseStopSignViolation'
  | 'usSmartEventRecordSenseRedLightViolation'
  | 'bSMT_SensLevel_DriverDistraction'
  | 'bSMT_SensLevel_DriverDrowsy'
  | 'bSMT_SensLevel_DriverPhoneUse'
  | 'bSMT_SensLevel_UnfastenSeatbelt';

export type SettingKey =
  | SettingGeneralKey
  | SettingDashcamKey
  | SettingEdgeKey
  | SettingSmarteventKey;
export type SettingCategory = 'General' | 'DashCam' | 'EdgeAI' | 'SmartEvent';
export type SettingGroup =
  | 'INSTALL'
  | 'OPX'
  | 'BB'
  // | 'LDW'
  | 'FCDA'
  // | 'FCW'
  | 'SDA'
  | 'VB'
  | 'AA'
  // | 'OSW'
  | 'DAW'
  | 'DDW'
  // | 'SBW'
  | 'Smart Event (Front)'
  | 'Smart Event (Cabin)';

export type DefineSettings = Record<
  SettingKey,
  {
    name: string;
    category: SettingCategory;
    group: SettingGroup;
    options: {
      unit: string;
      ranges: [] | null;
      labels: string[] | null;
    };
  }
>;

export interface SettingField {
  key: SettingKey;
  name: string;
  value: number;
  defaultValue: number;
  unit: string;
  options:
    | {
        key: SettingKey;
        value: number;
        label: string;
      }[]
    | null;
}

export type DeviceSetting = Array<{
  group: SettingGroup;
  fields: SettingField[];
}>;

export type DeviceSttings = Record<SettingCategory, DeviceSetting>;

export interface PanelCategory {
  title: string;
  category: SettingCategory | '';
  data: DeviceSetting;
}

/**
 * Device Setting 수정
 */
export type SettingGeneral = Record<SettingGeneralKey, number>;
export type SettingDashcam = Record<SettingDashcamKey, number>;
export type SettingEdge = Record<SettingEdgeKey, number>;
export type SettingSmartevent = Record<SettingSmarteventKey, number>;
export type SettingByCategory =
  | SettingGeneral
  | SettingDashcam
  | SettingEdge
  | SettingSmartevent;

export type UpdateDeviceSettingVariables<T = SettingByCategory> = T & {
  serial: string;
  updaterId: number;
};

export interface UpdateDeviceSettingPayload {
  panel: PanelCategory;
  isInit: boolean;
}

/**
 * Device Reset Wifi
 */
export interface ResetWifiPayload {
  variables: {
    serial: string;
  };
}

export interface ResetWifiResponse {
  commandRestWifi: {
    status: '00' | 'FAILED' | 'E001'; // 00 : 성공, FAILED : 실패, E001 : 필수 값 없음
    message: string;
    success: boolean;
  };
}

/**
 * Device Set Calibration
 */
export type SetCalibrationPayload = ResetWifiPayload;
export interface SetCalibrationResponse {
  commandCalibration: {
    status: '00' | 'FAILED' | 'E001'; // 00 : 성공, FAILED : 실패, E001 : 필수 값 없음
    message: string;
    success: boolean;
  };
}

/**
 * Device Memory Format
 */
export interface FormatMemoryPayload {
  variables: {
    serial: string;
    accountsId: number;
    formatType: 1 | 2; // 1: formatSD, 2: formatUSB
  };
}

export interface FormatMemoryResponse {
  formatDevice: {
    status: string;
    message: string;
    success: boolean;
  };
}
