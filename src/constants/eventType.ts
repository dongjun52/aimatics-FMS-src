import {
  EventCategoryInfo,
  EventCategoryKey,
  EventInfo,
  EventKey,
} from '@/types/common/eventType';

export const DRIVE_SAFETY_EVENT_TYPES = {
  // 이벤트 타입 상세
  DCA_EVENT_TYPE_SMART_CollisionRisk: {
    name: 'Collision Risk',
    type: 'DCA_EVENT_TYPE_SMART_CollisionRisk',
  },
  DCA_EVENT_TYPE_SMART_TailGating: {
    name: 'Tail Gating',
    type: 'DCA_EVENT_TYPE_SMART_TailGating',
  },
  DCA_EVENT_TYPE_SMART_RecklessDriving: {
    name: 'Reckless Driving',
    type: 'DCA_EVENT_TYPE_SMART_RecklessDriving',
  },
  DCA_EVENT_TYPE_SMART_RedLightViolation: {
    name: 'Red Light Violation',
    type: 'DCA_EVENT_TYPE_SMART_RedLightViolation',
  },
  DCA_EVENT_TYPE_SMART_StopSignViolation: {
    name: 'Stop Sign Violation',
    type: 'DCA_EVENT_TYPE_SMART_StopSignViolation',
  },
  DCA_EVENT_TYPE_SMART_BurstSpeed: {
    name: 'Burst Speed',
    type: 'DCA_EVENT_TYPE_SMART_BurstSpeed',
  },
  DCA_EVENT_TYPE_SMART_IllegalUTurn: {
    name: 'Illegal U-Turn',
    type: 'DCA_EVENT_TYPE_SMART_IllegalUTurn',
  },
  DCA_EVENT_TYPE_SMART_CentralLineViolation: {
    name: 'Central Line Violation',
    type: 'DCA_EVENT_TYPE_SMART_CentralLineViolation',
  },
  DCA_EVENT_TYPE_HARSH_Left_Turn: {
    name: 'Harsh Turn - L',
    type: 'DCA_EVENT_TYPE_HARSH_Left_Turn',
  },
  DCA_EVENT_TYPE_HARSH_Right_Turn: {
    name: 'Harsh Turn - R',
    type: 'DCA_EVENT_TYPE_HARSH_Right_Turn',
  },
  DCA_EVENT_TYPE_HARSH_UTurn: {
    name: 'Harsh U-Turn',
    type: 'DCA_EVENT_TYPE_HARSH_UTurn',
  },
  DCA_EVENT_TYPE_HARSH_Switching_Lanes: {
    name: 'Harsh Switching Lanes',
    type: 'DCA_EVENT_TYPE_HARSH_Switching_Lanes',
  },
  DCA_EVENT_TYPE_HARSH_Over_Taking: {
    name: 'Harsh Overtaking',
    type: 'DCA_EVENT_TYPE_HARSH_Over_Taking',
  },
  DCA_EVENT_TYPE_RapidAccel: {
    name: 'Rapid Accel',
    type: 'DCA_EVENT_TYPE_RapidAccel',
  },
  DCA_EVENT_TYPE_RapidDecel: {
    name: 'Rapid Dccel',
    type: 'DCA_EVENT_TYPE_RapidDecel',
  },
  DCA_EVENT_TYPE_SuddenStart: {
    name: 'Sudden Start',
    type: 'DCA_EVENT_TYPE_SuddenStart',
  },
  DCA_EVENT_TYPE_SuddenStop: {
    name: 'Sudden Stop',
    type: 'DCA_EVENT_TYPE_SuddenStop',
  },
  DCA_EVENT_TYPE_Gsensor: {
    name: 'G-Sensor',
    type: 'DCA_EVENT_TYPE_Gsensor',
  },
  DCA_EVENT_TYPE_Panic: {
    name: 'Panic',
    type: 'DCA_EVENT_TYPE_Panic',
  },
  DCA_EVENT_TYPE_Manual: {
    name: 'Panic',
    type: 'DCA_EVENT_TYPE_Manual',
  },
  // DCA_EVENT_TYPE_SMART_SchoolZoneViolation: {
  //   name: 'School Zone Violation',
  //   type: 'DCA_EVENT_TYPE_SMART_SchoolZoneViolation',
  // },
  // DCA_EVENT_TYPE_SMART_OverSpeed: {
  //   name: 'Over Speed',
  //   type: 'DCA_EVENT_TYPE_SMART_OverSpeed',
  // },
  DCA_EVENT_TYPE_SMART_OneWayReversing: {
    name: 'One Way Violation',
    type: 'DCA_EVENT_TYPE_SMART_OneWayReversing',
  },
  DCA_EVENT_TYPE_Gsensor_Light: {
    name: 'G-Sensor (Light)',
    type: 'DCA_EVENT_TYPE_Gsensor_Light',
  },
} as const;

export const DRIVER_EVENT_TYPES = {
  DCA_EVENT_TYPE_SMART_UnfastenSeatbelt: {
    name: 'Unbuckled Seat Belt',
    type: 'DCA_EVENT_TYPE_SMART_UnfastenSeatbelt',
  },
  DCA_EVENT_TYPE_SMART_PhoneUse: {
    name: 'Phone Use',
    type: 'DCA_EVENT_TYPE_SMART_PhoneUse',
  },
  DCA_EVENT_TYPE_SMART_Smoking: {
    name: 'Smoking',
    type: 'DCA_EVENT_TYPE_SMART_Smoking',
  },
  DCA_EVENT_TYPE_SMART_Distraction: {
    name: 'Distraction',
    type: 'DCA_EVENT_TYPE_SMART_Distraction',
  },
  DCA_EVENT_TYPE_SMART_Drowsy: {
    name: 'Drowsy',
    type: 'DCA_EVENT_TYPE_SMART_Drowsy',
  },
} as const;

export const EXTERNAL_EVENT_TYPES = {
  DCA_EVENT_TYPE_EXTERNAL_Crash: {
    name: 'External Crash',
    type: 'DCA_EVENT_TYPE_EXTERNAL_Crash',
  },
  DCA_EVENT_TYPE_EXTERNAL_HarshAcceleration: {
    name: 'External HarshAcceleration',
    type: 'DCA_EVENT_TYPE_EXTERNAL_HarshAcceleration',
  },
  DCA_EVENT_TYPE_EXTERNAL_HarshBraking: {
    name: 'External HarshBraking',
    type: 'DCA_EVENT_TYPE_EXTERNAL_HarshBraking',
  },
  DCA_EVENT_TYPE_EXTERNAL_HarshLeft: {
    name: 'External HarshLeft',
    type: 'DCA_EVENT_TYPE_EXTERNAL_HarshLeft',
  },
  DCA_EVENT_TYPE_EXTERNAL_HarshRight: {
    name: 'External HarshRight',
    type: 'DCA_EVENT_TYPE_EXTERNAL_HarshRight',
  },
  DCA_EVENT_TYPE_EXTERNAL_HarshTurn: {
    name: 'External HarshTurn',
    type: 'DCA_EVENT_TYPE_EXTERNAL_HarshTurn',
  },
  DCA_EVENT_TYPE_EXTERNAL_Panic: {
    name: 'External Panic',
    type: 'DCA_EVENT_TYPE_EXTERNAL_Panic',
  },
  DCA_EVENT_TYPE_EXTERNAL_RollOver: {
    name: 'External RollOver',
    type: 'DCA_EVENT_TYPE_EXTERNAL_RollOver',
  },
  DCA_EVENT_TYPE_EXTERNAL_LiveOnDemand: {
    name: 'External LiveOnDemand',
    type: 'DCA_EVENT_TYPE_EXTERNAL_LiveOnDemand',
  },
} as const;

export const ONDEMAND_EVENT_TYPES = {
  DCA_EVENT_TYPE_OnDemand: {
    name: 'Ondemand',
    type: 'DCA_EVENT_TYPE_OnDemand',
  },
} as const;

export const DRIVER_COACHING_TYPES = {
  DCA_EVENT_TYPE_LDW: {
    name: 'LDW',
    type: 'DCA_EVENT_TYPE_LDW',
  },
  DCA_EVENT_TYPE_VD_VCW: {
    name: 'VCW',
    type: 'DCA_EVENT_TYPE_VD_VCW',
  },
  DCA_EVENT_TYPE_VD_SDA: {
    name: 'SDA',
    type: 'DCA_EVENT_TYPE_VD_SDA',
  },
  DCA_EVENT_TYPE_VD_VB: {
    name: 'VBW',
    type: 'DCA_EVENT_TYPE_VD_VB',
  },
  DCA_EVENT_TYPE_VD_FCDA: {
    name: 'FCDA',
    type: 'DCA_EVENT_TYPE_VD_FCDA',
  },
  DCA_EVENT_TYPE_PD: {
    name: 'PCW',
    type: 'DCA_EVENT_TYPE_PD',
  },
  ADAS_RPCW: {
    name: 'RPCW',
    type: 'ADAS_RPCW',
  },
  DCA_EVENT_TYPE_AA: {
    name: 'AA',
    type: 'DCA_EVENT_TYPE_AA',
  },
  DCA_EVENT_TYPE_OS: {
    name: 'OSW',
    type: 'DCA_EVENT_TYPE_OS',
  },
  DCA_EVENT_TYPE_TAS: {
    name: 'TAS',
    type: 'DCA_EVENT_TYPE_TAS',
  },
  DCA_EVENT_TYPE_DDW: {
    name: 'DDW',
    type: 'DCA_EVENT_TYPE_DDW',
  },
  DCA_EVENT_TYPE_DAW: {
    name: 'DAW',
    type: 'DCA_EVENT_TYPE_DAW',
  },
  DCA_EVENT_TYPE_SubPD: {
    name: 'Sub PD',
    type: 'DCA_EVENT_TYPE_SubPD',
  },
} as const;

export const FMS_EVENTS: Record<EventKey, EventInfo<EventKey>> = Object.assign(
  {},
  DRIVE_SAFETY_EVENT_TYPES,
  DRIVER_EVENT_TYPES,
  EXTERNAL_EVENT_TYPES,
  ONDEMAND_EVENT_TYPES,
  DRIVER_COACHING_TYPES
);

export const FMS_CATEGORY_EVENTS: Record<EventCategoryKey, EventCategoryInfo> =
  {
    DRIVE_SAFETY_EVENT: {
      name: 'Drive Safety Event',
      // color: 'bg_purple2',
      color: '#cf74fc',
      types: DRIVE_SAFETY_EVENT_TYPES,
    },
    DRIVER_EVENT: {
      name: 'Driver Event',
      // color: 'bg_yellow',
      color: '#feb14e',
      types: DRIVER_EVENT_TYPES,
    },
    EXTERNAL_EVENT: {
      name: 'External Event',
      color: '#60c7a7',
      types: EXTERNAL_EVENT_TYPES,
    },
    ONDEMAND_EVENT: {
      name: 'Ondemand',
      color: '#ec7373',
      types: ONDEMAND_EVENT_TYPES,
    },
    DRIVER_COACHING: {
      name: 'Driver Coaching',
      // color: 'bg_red',
      color: '#877afc',
      types: DRIVER_COACHING_TYPES,
    },
  };

/*

[북미 이벤트 정리 문서에 없는 이벤트]

 DCA_EVENT_TYPE_Harsh_Cornering_Left
 DCA_EVENT_TYPE_Harsh_Cornering_Right
 DCA_EVENT_TYPE_DriverInattention
 DCA_EVENT_TYPE_SMART_CollisionRiskPedestrian
 DCA_EVENT_TYPE_SMART_CollisionRiskVehicle
 DCA_EVENT_TYPE_SMART_CarPoolLaneViolation
 DCA_EVENT_TYPE_DAW

[북미에서 사용하지 않는 이벤트(미분류)]

 DCA_EVENT_TYPE_SMART_OverSpeed
 DCA_EVENT_TYPE_SMART_SchoolZoneViolation
 */
