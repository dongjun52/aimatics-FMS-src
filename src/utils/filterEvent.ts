import type { StatisticsElements } from '@/types/service/device/dca';
import {
  DRIVE_SAFETY_EVENT_TYPES,
  DRIVER_COACHING_TYPES,
  DRIVER_EVENT_TYPES,
  // EXTERNAL_EVENT_TYPES,
  // ONDEMAND_EVENT_TYPES,
} from '@/constants/eventType';

const excludeFromDriveSafetyEvent: string[] = [
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_SMART_BurstSpeed.type,
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_SMART_IllegalUTurn.type,
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_SMART_CentralLineViolation.type,
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_SMART_OneWayReversing.type,
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_Gsensor_Light.type,
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_HARSH_Left_Turn.type,
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_HARSH_Right_Turn.type,
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_HARSH_UTurn.type,
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_HARSH_Switching_Lanes.type,
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_HARSH_Over_Taking.type,
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_RapidAccel.type,
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_RapidDecel.type,
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_SuddenStart.type,
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_SuddenStop.type,
  DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_Gsensor.type,
];

const excludeFromDriverCoaching: string[] = [
  DRIVER_COACHING_TYPES.DCA_EVENT_TYPE_LDW.type,
  DRIVER_COACHING_TYPES.DCA_EVENT_TYPE_VD_VCW.type,
  DRIVER_COACHING_TYPES.DCA_EVENT_TYPE_PD.type,
  DRIVER_COACHING_TYPES.ADAS_RPCW.type,
  DRIVER_COACHING_TYPES.DCA_EVENT_TYPE_OS.type,
  DRIVER_COACHING_TYPES.DCA_EVENT_TYPE_TAS.type,
  DRIVER_COACHING_TYPES.DCA_EVENT_TYPE_SubPD.type,
];

const excludeFromDriverEvent: string[] = [
  DRIVER_EVENT_TYPES.DCA_EVENT_TYPE_SMART_Smoking.type,
];

export const checkDeviceTypeForPanicEvent = (deviceType: 'R8' | 'R9'): void => {
  const panic = DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_Panic.type;
  const manual = DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_Manual.type;

  switch (true) {
    // Panic 타입이 r8/r9에 따라 다르기에 분류
    case deviceType === 'R9' && !excludeFromDriveSafetyEvent.includes(panic):
      if (excludeFromDriveSafetyEvent.at(-1) === manual) {
        excludeFromDriveSafetyEvent.pop();
      }
      excludeFromDriveSafetyEvent.push(panic);
      break;
    case deviceType === 'R8' && !excludeFromDriveSafetyEvent.includes(manual):
      if (excludeFromDriveSafetyEvent.at(-1) === panic) {
        excludeFromDriveSafetyEvent.pop();
      }
      excludeFromDriveSafetyEvent.push(manual);
      break;
  }
};

export const isIncludeEvent = (eventType: string): boolean => {
  let isInclude = true;

  switch (true) {
    case excludeFromDriveSafetyEvent.includes(eventType):
    case excludeFromDriverCoaching.includes(eventType):
    case excludeFromDriverEvent.includes(eventType):
      isInclude = false;
      break;
    default:
      isInclude = true;
      break;
  }

  return isInclude;
};

export const isIncludeEvents = (
  statistics: StatisticsElements
): ReturnType<() => StatisticsElements> => {
  const { eventGroup, parentsEventName, childEvents } = statistics;

  return {
    eventGroup,
    parentsEventName,
    childEvents: childEvents.filter((childEvent) =>
      isIncludeEvent(childEvent.eventType)
    ),
  };
};
