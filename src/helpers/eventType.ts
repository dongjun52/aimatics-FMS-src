import { FMS_CATEGORY_EVENTS } from '@/constants/eventType';
import {
  EventCategoryInfo,
  EventInfo,
  EventKey,
} from '@/types/common/eventType';

/**
 * 이벤트 타입으로 카테고리 정보를 얻는다.
 * @param type
 * @returns
 */
export const getEventCategory = (type: EventKey): EventCategoryInfo => {
  let category = {} as EventCategoryInfo;
  Object.entries(FMS_CATEGORY_EVENTS).map(([_, categoryValue]) => {
    return Object.entries(categoryValue.types).some(([_, eventValue]) => {
      if (eventValue.type === type) {
        category = categoryValue;
        return true;
      }
    });
  });
  return category;
};

export const getEventCategoryName = (type: EventKey): string =>
  getEventCategory(type).name;

/**
 * 이벤트 타입으로 이벤트 정도를 얻는다.
 * @param type
 * @returns
 */
export const getEvent = (type: EventKey): EventInfo<EventKey> => {
  const event = getEventCategory(type).types[type];

  return (
    event || {
      name: '',
      type: '',
    }
  );
};

export const getEventColor = (type: EventKey): string =>
  getEventCategory(type).color;
export const getEventName = (type: EventKey): string => {
  return getEvent(type).name;
};
