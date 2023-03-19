import {
  DRIVE_SAFETY_EVENT_TYPES,
  DRIVER_COACHING_TYPES,
  EXTERNAL_EVENT_TYPES,
  DRIVER_EVENT_TYPES,
  // ONDEMAND_EVENT_TYPES,
} from '@/constants/eventType';
import type { ChildEvents } from '@/types/service/device/dca';
import { isIncludeEvent } from '@/utils/filterEvent';

export const getChildEvents = (events: any): ChildEvents[] => {
  let result: ChildEvents[] = [];

  result = Object.keys(events).map((key): ChildEvents => {
    if (
      isIncludeEvent(events[key].type) &&
      events[key].type !== DRIVE_SAFETY_EVENT_TYPES.DCA_EVENT_TYPE_Panic.type
    ) {
      return {
        eventType: events[key].type,
        name: events[key].name,
        count: 0,
      };
    }
  });

  result = result.filter((element) => element !== undefined);
  return result;
};

export const DriveSafetyEvent = {
  eventGroup: 'Drive Safety Event',
  parentsEventName: 'Drive Safety Event',
  childEvents: getChildEvents(DRIVE_SAFETY_EVENT_TYPES),
};

export const DriverCoaching = {
  eventGroup: 'driverCoaching',
  parentsEventName: 'Driver Coaching',
  childEvents: getChildEvents(DRIVER_COACHING_TYPES),
};

export const ExternalEvent = {
  eventGroup: 'externalEvent',
  parentsEventName: 'ExternalEvent',
  childEvents: getChildEvents(EXTERNAL_EVENT_TYPES),
};

export const DriverEvent = {
  eventGroup: 'driverEvent',
  parentsEventName: 'DriverEvent',
  childEvents: getChildEvents(DRIVER_EVENT_TYPES),
};

export const OndemandEvent = {
  eventGroup: 'ondemandEvent',
  parentsEventName: 'OndemandEvent',
  childEvents: [
    {
      eventType: 'OndemandEvent',
      name: 'Ondemand Event',
      count: 0,
    },
  ],
};
