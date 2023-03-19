export type EventCategoryKey =
  | 'DRIVE_SAFETY_EVENT'
  | 'DRIVER_EVENT'
  | 'DRIVER_COACHING';

export type DriveSaftyEventKey =
  | 'DCA_EVENT_TYPE_SMART_CollisionRisk'
  | 'DCA_EVENT_TYPE_SMART_TailGating'
  | 'DCA_EVENT_TYPE_SMART_RecklessDriving'
  | 'DCA_EVENT_TYPE_SMART_RedLightViolation'
  | 'DCA_EVENT_TYPE_SMART_StopSignViolation'
  | 'DCA_EVENT_TYPE_SMART_BurstSpeed'
  | 'DCA_EVENT_TYPE_SMART_IlleagalUTurn'
  | 'DCA_EVENT_TYPE_SMART_SchoolZoneViolation'
  | 'DCA_EVENT_TYPE_SMART_OverSpeed'
  | 'DCA_EVENT_TYPE_SMART_OneWayReversing'
  | 'DCA_EVENT_TYPE_SMART_CentralLineViolation'
  | 'DCA_EVENT_TYPE_HARSH_LEFT_TURN'
  | 'DCA_EVENT_TYPE_HARSH_RIGHT_TURN'
  | 'DCA_EVENT_TYPE_HARSH_UTURN'
  | 'DCA_EVENT_TYPE_HARSH_SWITCHING_LANES'
  | 'DCA_EVENT_TYPE_HARSH_OVER_TAKING'
  | 'DCA_EVENT_TYPE_HardAccel'
  | 'DCA_EVENT_TYPE_HardDecel'
  | 'DCA_EVENT_TYPE_HardStart'
  | 'DCA_EVENT_TYPE_HardStop'
  | 'DCA_EVENT_TYPE_Gsensor'
  | 'DCA_EVENT_TYPE_Gsensor_Light'
  | 'DCA_EVENT_TYPE_Panic';

export type DriverEventKey =
  | 'DCA_EVENT_TYPE_SMART_SEATBELT'
  | 'DCA_EVENT_TYPE_SMART_USE'
  | 'DCA_EVENT_TYPE_SMART_SMOKING'
  | 'DCA_EVENT_TYPE_SMART_DISTRACTION'
  | 'DCA_EVENT_TYPE_SMART_DROWSY';

export type DriverCoachingKey =
  | 'DCA_EVENT_TYPE_VD_VCW'
  | 'DCA_EVENT_TYPE_LDW_LEFT'
  | 'DCA_EVENT_TYPE_LDW_RIGHT'
  | 'DCA_EVENT_TYPE_VD_SDA'
  | 'DCA_EVENT_TYPE_VD_VB'
  | 'DCA_EVENT_TYPE_VD_FCDA'
  | 'DCA_EVENT_TYPE_DSMDDW'
  | 'DCA_EVENT_TYPE_DSMDAW';

export type EventKey = DriveSaftyEventKey | DriverEventKey | DriverCoachingKey;

export interface EventInfo<T> {
  name: string;
  type: T;
}

export interface EventCategoryInfo {
  name: string;
  color: string;
  types:
    | Record<DriveSaftyEventKey, EventInfo<DriveSaftyEventKey>>
    | Record<DriverEventKey, EventInfo<DriverEventKey>>
    | Record<DriverCoachingKey, EventInfo<DriverCoachingKey>>;
}
