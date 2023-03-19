export type EventCategoryKey =
  | 'DRIVE_SAFETY_EVENT'
  | 'DRIVER_EVENT'
  | 'EXTERNAL_EVENT'
  | 'ONDEMAND_EVENT'
  | 'DRIVER_COACHING';

export type DriveSaftyEventKey =
  | 'DCA_EVENT_TYPE_SMART_CollisionRisk'
  | 'DCA_EVENT_TYPE_SMART_TailGating'
  | 'DCA_EVENT_TYPE_SMART_RecklessDriving'
  | 'DCA_EVENT_TYPE_SMART_RedLightViolation'
  | 'DCA_EVENT_TYPE_SMART_StopSignViolation'
  | 'DCA_EVENT_TYPE_SMART_BurstSpeed'
  | 'DCA_EVENT_TYPE_SMART_IllegalUTurn'
  | 'DCA_EVENT_TYPE_SMART_CentralLineViolation'
  | 'DCA_EVENT_TYPE_HARSH_Left_Turn'
  | 'DCA_EVENT_TYPE_HARSH_Right_Turn'
  | 'DCA_EVENT_TYPE_HARSH_UTurn'
  | 'DCA_EVENT_TYPE_HARSH_Switching_Lanes'
  | 'DCA_EVENT_TYPE_HARSH_Over_Taking'
  | 'DCA_EVENT_TYPE_RapidAccel'
  | 'DCA_EVENT_TYPE_RapidDecel'
  | 'DCA_EVENT_TYPE_SuddenStart'
  | 'DCA_EVENT_TYPE_SuddenStop'
  | 'DCA_EVENT_TYPE_Gsensor'
  | 'DCA_EVENT_TYPE_Panic'
  | 'DCA_EVENT_TYPE_Manual'
  // | 'DCA_EVENT_TYPE_SMART_SchoolZoneViolation'
  // | 'DCA_EVENT_TYPE_SMART_OverSpeed'
  | 'DCA_EVENT_TYPE_SMART_OneWayReversing'
  | 'DCA_EVENT_TYPE_Gsensor_Light';

export type DriverEventKey =
  | 'DCA_EVENT_TYPE_SMART_UnfastenSeatbelt'
  | 'DCA_EVENT_TYPE_SMART_PhoneUse'
  | 'DCA_EVENT_TYPE_SMART_Smoking'
  | 'DCA_EVENT_TYPE_SMART_Distraction'
  | 'DCA_EVENT_TYPE_SMART_Drowsy';

export type ExternalEventKey =
  | 'DCA_EVENT_TYPE_EXTERNAL_Crash'
  | 'DCA_EVENT_TYPE_EXTERNAL_HarshAcceleration'
  | 'DCA_EVENT_TYPE_EXTERNAL_HarshBraking'
  | 'DCA_EVENT_TYPE_EXTERNAL_HarshLeft'
  | 'DCA_EVENT_TYPE_EXTERNAL_HarshRight'
  | 'DCA_EVENT_TYPE_EXTERNAL_HarshTurn'
  | 'DCA_EVENT_TYPE_EXTERNAL_Panic'
  | 'DCA_EVENT_TYPE_EXTERNAL_RollOver'
  | 'DCA_EVENT_TYPE_EXTERNAL_LiveOnDemand';

export type OndemandEventKey = 'DCA_EVENT_TYPE_OnDemand';

export type DriverCoachingKey =
  | 'DCA_EVENT_TYPE_LDW'
  | 'DCA_EVENT_TYPE_VD_VCW'
  | 'DCA_EVENT_TYPE_VD_SDA'
  | 'DCA_EVENT_TYPE_VD_VB'
  | 'DCA_EVENT_TYPE_VD_FCDA'
  | 'DCA_EVENT_TYPE_PD'
  | 'ADAS_RPCW'
  | 'DCA_EVENT_TYPE_AA'
  | 'DCA_EVENT_TYPE_OS'
  | 'DCA_EVENT_TYPE_TAS'
  | 'DCA_EVENT_TYPE_DDW'
  | 'DCA_EVENT_TYPE_DAW'
  | 'DCA_EVENT_TYPE_SubPD';

export type EventKey =
  | DriveSaftyEventKey
  | DriverEventKey
  | DriverCoachingKey
  | OndemandEventKey
  | ExternalEventKey;

export interface EventInfo<T> {
  name: string;
  type: T;
}

export interface EventCategoryInfo {
  name: string;
  color: string;
  types:
    | Record<DriveSaftyEventKey, EventInfo<DriveSaftyEventKey>>
    | Record<ExternalEventKey, EventInfo<ExternalEventKey>>
    | Record<OndemandEventKey, EventInfo<OndemandEventKey>>
    | Record<DriverEventKey, EventInfo<DriverEventKey>>
    | Record<DriverCoachingKey, EventInfo<DriverCoachingKey>>;
}
