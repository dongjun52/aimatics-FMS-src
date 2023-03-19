export interface DcaStatisticsAndAlertsPayload {
  serial: string;
  startDate: string;
  endDate: string;
}

export interface ChildEvents {
  eventType: string;
  name: string;
  count: number;
}

export interface StatisticsElements {
  eventGroup: string;
  parentsEventName: string;
  childEvents: Array<ChildEvents>;
}

export interface onDemandElements {
  lat: number;
  lng: number;
  eventTime: string;
  eventTag: string;
  eventType: string;
  alertType: string;
  videoId: number;
  serial: string;
  encodedFiles: string | null;
}

export interface DcaStatisticsAndAlertsResponse {
  getDcaStatisticsPage: {
    statistics: Array<StatisticsElements>;
    ondemandResList: Array<onDemandElements>;
  };
}

export type DcaEventEachCountsListKey =
  | 'driveSafetyEvent'
  | 'driverCoaching'
  | 'externalEvent'
  | 'driverEvent'
  | 'onDemandEvent';

export type DcaEventEachCountsList = Record<
  DcaEventEachCountsListKey,
  StatisticsElements
>;
