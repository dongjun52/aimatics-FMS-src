import {
  DefineSettings,
  SettingGroup,
} from '@/types/service/device/deviceSetting';

export const DEFINE_CATEGORY = {
  GENERAL: 'General',
  DASH_CAM: 'DashCam',
  EDGE_AI: 'EdgeAI',
  SMART_EVENT: 'SmartEvent',
} as const;

export const GROUP: Record<SettingGroup, SettingGroup> = {
  INSTALL: 'INSTALL',
  OPX: 'OPX',
  BB: 'BB',
  // LDW: 'LDW',
  FCDA: 'FCDA',
  // FCW: 'FCW',
  SDA: 'SDA',
  VB: 'VB',
  AA: 'AA',
  // OSW: 'OSW',
  DAW: 'DAW',
  DDW: 'DDW',
  // SBW: 'SBW',
  ['Smart Event (Front)']: 'Smart Event (Front)',
  ['Smart Event (Cabin)']: 'Smart Event (Cabin)',
} as const;

/**
 * - API range 를 사용하여 Label 표출이 기본
 * - DEFINE_SETTINGS 에 label 이 정의되어 있는 경우에는 DEFINE_SETTINGS 에 있는 label 을 사용
 * - API range 가 [] 일 경우, 텍스트박스 표출
 */
export const DEFINE_SETTINGS: DefineSettings = {
  // # Dimension / General Settings > INSTALL
  usInstall_CamHeight: {
    name: 'Camera Height',
    category: DEFINE_CATEGORY.GENERAL,
    group: GROUP.INSTALL,
    options: {
      unit: 'inch',
      ranges: null,
      labels: null,
    },
  },
  usInstall_CarWidth: {
    name: 'Vehicle Length',
    category: DEFINE_CATEGORY.GENERAL,
    group: GROUP.INSTALL,
    options: {
      unit: 'inch',
      ranges: null,
      labels: null,
    },
  },
  usInstall_BonnetLength: {
    name: 'Bonnet Length',
    category: DEFINE_CATEGORY.GENERAL,
    group: GROUP.INSTALL,
    options: {
      unit: 'inch',
      ranges: null,
      labels: null,
    },
  },
  usInstall_AttachedPos: {
    name: 'Install Position',
    category: DEFINE_CATEGORY.GENERAL,
    group: GROUP.INSTALL,
    options: {
      unit: '',
      ranges: [],
      labels: ['Left', 'Center', 'Right'],
    },
  },
  bDSM_DriverPos: {
    name: 'Driver Position',
    category: DEFINE_CATEGORY.GENERAL,
    group: GROUP.INSTALL,
    options: {
      unit: '',
      ranges: [],
      labels: ['Left', 'Center', 'Right'],
    },
  },
  // # Dimension / General Settings > OPX
  bSoundType: {
    name: 'Volume Setting',
    category: DEFINE_CATEGORY.GENERAL,
    group: GROUP.OPX,
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'On(Non Muteable)', 'On(Muteable)'],
    },
  },
  // bitrateCam0: {
  //   name: 'Front Cam Bitrate',
  //   category: DEFINE_CATEGORY.GENERAL,
  //   group: GROUP.OPX,
  //   options: {
  //     unit: '',
  //     ranges: [],
  //     labels: ['Low', 'Mid', 'High'],
  //   },
  // },
  // bitrateCam1: {
  //   name: 'Inward Cam Bitrate',
  //   category: DEFINE_CATEGORY.GENERAL,
  //   group: GROUP.OPX,
  //   options: {
  //     unit: '',
  //     ranges: [],
  //     labels: ['Low', 'Mid', 'High'],
  //   },
  // },
  bWatermark: {
    name: 'Watermark',
    category: DEFINE_CATEGORY.GENERAL,
    group: GROUP.OPX,
    options: {
      unit: '',
      ranges: null,
      labels: ['No Display', 'Display'],
    },
  },
  // # DashCam > BB
  usInfiniteEnable: {
    name: 'Continuous Recording',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'On'],
    },
  },
  usEventEnable: {
    name: 'Event Recording',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'On'],
    },
  },
  usStillCutEnable: {
    name: 'Capturing Still Cut',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'On'],
    },
  },
  usMicInEnable: {
    name: 'Voice Recording',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'On'],
    },
  },
  usAccTriggerX: {
    name: 'G-Sensor(Harsh) X - Normal',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: null,
      labels: null,
    },
  },
  usAccTriggerY: {
    name: 'G-Sensor(Harsh) Y - Normal',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: null,
      labels: null,
    },
  },
  usAccTriggerZ: {
    name: 'G-Sensor(Harsh) Z - Normal',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: null,
      labels: null,
    },
  },
  usAccTriggerX2: {
    name: 'G-Sensor(Harsh) X - High',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: null,
      labels: null,
    },
  },
  usAccTriggerY2: {
    name: 'G-Sensor(Harsh) Y - High',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: null,
      labels: null,
    },
  },
  usAccTriggerZ2: {
    name: 'G-Sensor(Harsh) Z - High',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: null,
      labels: null,
    },
  },
  usAccLightTriggerX: {
    name: 'G-Sensor(Light) X - Normal',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: null,
      labels: null,
    },
  },
  usAccLightTriggerY: {
    name: 'G-Sensor(Light) Y - Normal',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: null,
      labels: null,
    },
  },
  usAccLightTriggerZ: {
    name: 'G-Sensor(Light) Z - Normal',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: null,
      labels: null,
    },
  },
  usAccLightTriggerX2: {
    name: 'G-Sensor(Light) X - High',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: null,
      labels: null,
    },
  },
  usAccLightTriggerY2: {
    name: 'G-Sensor(Light) Y - High',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: null,
      labels: null,
    },
  },
  usAccLightTriggerZ2: {
    name: 'G-Sensor(Light) Z - High',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: null,
      labels: null,
    },
  },
  usResolution: {
    name: 'Front Cam Resolution',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: [],
      labels: ['FHD', 'HD'],
    },
  },
  usRearResolution: {
    name: 'Inward Cam Resolution',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: [],
      labels: ['FHD', 'HD'],
    },
  },
  usDisplaySpeedUnit: {
    name: 'Speed Unit',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: [],
      labels: ['kph', 'mph'],
    },
  },
  usSndLanguage: {
    name: 'Voice Language',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: [],
      labels: ['Korean', 'English', 'Japanese'],
    },
  },
  usSoundVolume: {
    name: 'Speaker Volume',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: [],
      labels: ['0', '1~3', '4~6', '7~9', '10~12', '13~15'],
    },
  },
  usEvt_SndEffect: {
    name: 'Event Sound',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'On'],
    },
  },
  usEvt_SndVoice: {
    name: 'Event Voice',
    category: DEFINE_CATEGORY.DASH_CAM,
    group: GROUP.BB,
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'On'],
    },
  },
  // // # Edge AI / Driver Monitoring > LDW
  // usLdw_On: {
  //   name: 'LDW (Lane Departure Warning)',
  //   category: DEFINE_CATEGORY.EDGE_AI,
  //   group: GROUP.LDW,
  //   options: {
  //     unit: '',
  //     ranges: [],
  //     labels: ['Off', 'On'],
  //   },
  // },
  // sLdw_SensL: {
  //   name: 'LDW Alarm Timing(Left)',
  //   category: DEFINE_CATEGORY.EDGE_AI,
  //   group: GROUP.LDW,
  //   options: {
  //     unit: '',
  //     ranges: [],
  //     labels: [
  //       '-5 (Insensitive)',
  //       '-4',
  //       '-3',
  //       '-2',
  //       '-1',
  //       '0 (Normal)',
  //       '1',
  //       '2',
  //       '3',
  //       '4',
  //       '5 (Sensitive)',
  //     ],
  //   },
  // },
  // sLdw_SensR: {
  //   name: 'LDW Alarm Timing(Right)',
  //   category: DEFINE_CATEGORY.EDGE_AI,
  //   group: GROUP.LDW,
  //   options: {
  //     unit: '',
  //     ranges: [],
  //     labels: [
  //       '-5 (Insensitive)',
  //       '-4',
  //       '-3',
  //       '-2',
  //       '-1',
  //       '0 (Normal)',
  //       '1',
  //       '2',
  //       '3',
  //       '4',
  //       '5 (Sensitive)',
  //     ],
  //   },
  // },
  // bLDW_KphWarn: {
  //   name: 'LDW Operation Start Speed(MPH)',
  //   category: DEFINE_CATEGORY.EDGE_AI,
  //   group: GROUP.LDW,
  //   options: {
  //     unit: 'mph',
  //     ranges: null,
  //     labels: null,
  //   },
  // },
  // # Edge AI / Driver Monitoring > FCDA
  usBnw_On: {
    name: 'FCDA (Front Car Departure Alert)',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.FCDA,
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'On'],
    },
  },
  // // # Edge AI / Driver Monitoring > FCW
  // usFcw_On: {
  //   name: 'FCW (Forward Collision Warning)',
  //   category: DEFINE_CATEGORY.EDGE_AI,
  //   group: GROUP.FCW,
  //   options: {
  //     unit: '',
  //     ranges: [],
  //     labels: ['Off', 'On'],
  //   },
  // },
  // usFcw_TTCSense: {
  //   name: 'FCW Sensitivity',
  //   category: DEFINE_CATEGORY.EDGE_AI,
  //   group: GROUP.FCW,
  //   options: {
  //     unit: '',
  //     ranges: [],
  //     labels: ['0 (Insensitive)', '1 (Normal)', '2 (Sensitive)'],
  //   },
  // },
  // # Edge AI / Driver Monitoring > SDA
  usHmw_On: {
    name: 'SDA (Safe Distance Alert)',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.SDA,
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'On'],
    },
  },
  bHMW_KphWarn: {
    name: 'SDA Operation Start Speed(MPH)',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.SDA,
    options: {
      unit: 'mph',
      ranges: null,
      labels: null,
    },
  },
  bHMW_WarningTTT1st: {
    name: 'SDA Alarm Sensitivity(1st)',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.SDA,
    options: {
      unit: '',
      ranges: [],
      labels: [
        'OFF',
        '0.4sec',
        '0.5sec',
        '0.6sec',
        '0.7sec',
        '0.8sec',
        '0.9sec',
        '1.0sec',
        '1.1sec',
        '1.2sec',
      ],
    },
  },
  usFcw_WarningStart: {
    name: 'SDA Alarm Sensitivity(2nd)',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.SDA,
    options: {
      unit: '',
      ranges: [],
      labels: [
        'OFF',
        '0.4sec',
        '0.5sec',
        '0.6sec',
        '0.7sec',
        '0.8sec',
        '0.9sec',
        '1.0sec',
        '1.1sec',
        '1.2sec',
      ],
    },
  },
  // # Edge AI / Driver Monitoring > VB
  usVb_On: {
    name: 'VB (Virtual Bumper)',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.VB,
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'On'],
    },
  },
  usVb_Sense: {
    name: 'VB Sensitivity',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.VB,
    options: {
      unit: 'inch',
      ranges: null,
      labels: null,
    },
  },
  // # Edge AI / Driver Monitoring > AA
  bAAFunctionON: {
    name: 'AA (Attention Assist)',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.AA,
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'On'],
    },
  },
  bAA_SensLevel_StartSpeed: {
    name: 'AA Speed Setting',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.AA,
    options: {
      unit: 'mph',
      ranges: null,
      labels: null,
    },
  },
  bAA_SensLevel_tDriving: {
    name: 'AA Driving Time Setting',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.AA,
    options: {
      unit: 'min',
      ranges: null,
      labels: null,
    },
  },
  bAA_SensLevel_tBreak: {
    name: 'AA Break Time Setting',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.AA,
    options: {
      unit: 'min',
      ranges: null,
      labels: null,
    },
  },
  // // # Edge AI / Driver Monitoring > OSW
  // bOSWFunctionON: {
  //   name: 'OSW (Over Speed Warning)',
  //   category: DEFINE_CATEGORY.EDGE_AI,
  //   group: GROUP.OSW,
  //   options: {
  //     unit: '',
  //     ranges: [],
  //     labels: ['Off', 'On'],
  //   },
  // },
  // bOSW_StartSpeed: {
  //   name: 'OSW Operation Start Speed(MPH)',
  //   category: DEFINE_CATEGORY.EDGE_AI,
  //   group: GROUP.OSW,
  //   options: {
  //     unit: 'mph',
  //     ranges: null,
  //     labels: null,
  //   },
  // },
  // # Edge AI / Driver Monitoring > DAW
  bDAWFunctionON: {
    name: 'DAW(Driver Action Warning - Phone Use)',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.DAW,
    options: {
      unit: '',
      ranges: null,
      labels: ['Off', 'On'],
    },
  },
  bDAW_SensLevel_Phone: {
    name: 'Phone Use Sensitivity',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.DAW,
    options: {
      unit: '',
      ranges: [],
      labels: ['Insensitive', 'Normal', 'Sensitive'],
    },
  },
  bDAW_Phone_KphWarn: {
    name: 'Phone Use Operation Start Speed(MPH)',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.DAW,
    options: {
      unit: 'mph',
      ranges: null,
      labels: null,
    },
  },
  // # Edge AI / Driver Monitoring > DDW
  bDDWFunctionON: {
    name: 'DDW(Driver Drowsiness/Distraction Warning)',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.DDW,
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'On'],
    },
  },
  bDDW_SensLevel_Distraction: {
    name: 'Distraction Sensitivity',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.DDW,
    options: {
      unit: '',
      ranges: [],
      labels: ['Insensitive', 'Normal', 'Sensitive'],
    },
  },
  bDDW_Distraction_KphWarn: {
    name: 'Distraction Operation Start Speed(MPH)',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.DDW,
    options: {
      unit: 'mph',
      ranges: null,
      labels: null,
    },
  },
  bDDW_SensLevel_Drowsy: {
    name: 'Drowsiness Sensitivity',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.DDW,
    options: {
      unit: '',
      ranges: [],
      labels: ['Insensitive', 'Normal', 'Sensitive'],
    },
  },
  bDDW_Drowsy_KphWarn: {
    name: 'Drowsiness Operation Start Speed(MPH)',
    category: DEFINE_CATEGORY.EDGE_AI,
    group: GROUP.DDW,
    options: {
      unit: 'mph',
      ranges: null,
      labels: null,
    },
  },
  // // # Edge AI / Driver Monitoring > SBW
  // bSBWFunctionON: {
  //   name: 'SBW(Unfasten Seatbelt Warning)',
  //   category: DEFINE_CATEGORY.EDGE_AI,
  //   group: GROUP.SBW,
  //   options: {
  //     unit: '',
  //     ranges: [],
  //     labels: ['Off', 'On'],
  //   },
  // },
  // bSBW_SensLevel_Seatbelt: {
  //   name: 'SBW Sensitivitiy',
  //   category: DEFINE_CATEGORY.EDGE_AI,
  //   group: GROUP.SBW,
  //   options: {
  //     unit: '',
  //     ranges: null,
  //     labels: ['Insensitive', 'Normal', 'Sensitive'],
  //   },
  // },
  // bSBW_KphWarn: {
  //   name: 'SBW Operation Start Speed(MPH)',
  //   category: DEFINE_CATEGORY.EDGE_AI,
  //   group: GROUP.SBW,
  //   options: {
  //     unit: 'mph',
  //     ranges: null,
  //     labels: null,
  //   },
  // },
  // # Smart Event > Smart Event(Front)
  usSmartEventRecordSenseTailGating: {
    name: 'Tailgating Sensitivity',
    category: DEFINE_CATEGORY.SMART_EVENT,
    group: GROUP['Smart Event (Front)'],
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'Insensitive', 'Normal', 'Sensitive'],
    },
  },
  usSmartEventRecordSenseCollisionRisk: {
    name: 'CollisionRisk Sensitivity',
    category: DEFINE_CATEGORY.SMART_EVENT,
    group: GROUP['Smart Event (Front)'],
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'Insensitive', 'Normal', 'Sensitive'],
    },
  },
  usSmartEventRecordSenseRecklessDriving: {
    name: 'RecklessDriving Sensitivity',
    category: DEFINE_CATEGORY.SMART_EVENT,
    group: GROUP['Smart Event (Front)'],
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'Insensitive', 'Normal', 'Sensitive'],
    },
  },
  usSmartEventRecordSenseStopSignViolation: {
    name: 'StopSignViolation Sensitivity',
    category: DEFINE_CATEGORY.SMART_EVENT,
    group: GROUP['Smart Event (Front)'],
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'Insensitive', 'Normal', 'Sensitive'],
    },
  },
  usSmartEventRecordSenseRedLightViolation: {
    name: 'RedLightViolation Sensitivity',
    category: DEFINE_CATEGORY.SMART_EVENT,
    group: GROUP['Smart Event (Front)'],
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'Insensitive', 'Normal', 'Sensitive'],
    },
  },
  // # Smart Event > Smart Event(Cabin)
  bSMT_SensLevel_DriverDistraction: {
    name: 'DriverDistraction Sensitivity',
    category: DEFINE_CATEGORY.SMART_EVENT,
    group: GROUP['Smart Event (Cabin)'],
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'Insensitive', 'Normal', 'Sensitive'],
    },
  },
  bSMT_SensLevel_DriverDrowsy: {
    name: 'DriverDrowsy Sensitivity',
    category: DEFINE_CATEGORY.SMART_EVENT,
    group: GROUP['Smart Event (Cabin)'],
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'Insensitive', 'Normal', 'Sensitive'],
    },
  },
  bSMT_SensLevel_DriverPhoneUse: {
    name: 'DriverPhoneUse Sensitivity',
    category: DEFINE_CATEGORY.SMART_EVENT,
    group: GROUP['Smart Event (Cabin)'],
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'Insensitive', 'Normal', 'Sensitive'],
    },
  },
  bSMT_SensLevel_UnfastenSeatbelt: {
    name: 'UnfastenSeatbelt Sensitivity',
    category: DEFINE_CATEGORY.SMART_EVENT,
    group: GROUP['Smart Event (Cabin)'],
    options: {
      unit: '',
      ranges: [],
      labels: ['Off', 'Insensitive', 'Normal', 'Sensitive'],
    },
  },
};
