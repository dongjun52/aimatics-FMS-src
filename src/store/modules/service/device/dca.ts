import type { RootState } from '@/store';
import type { ActionTree, MutationTree, Module } from 'vuex';
import type {
  DcaEventEachCountsList,
  DcaStatisticsAndAlertsPayload,
  DcaStatisticsAndAlertsResponse,
  onDemandElements,
} from '@/types/service/device/dca';

import graphqlClient from '@/utils/graphql';
import { GET_DCA_STATISTICS_AND_ALERTS } from '@/graphql/service/device/dca';
import { FMS_CATEGORY_EVENTS } from '@/constants/eventType';
import {
  checkDeviceTypeForPanicEvent,
  isIncludeEvent,
  isIncludeEvents,
} from '@/utils/filterEvent';
import {
  DriveSafetyEvent,
  DriverCoaching,
  ExternalEvent,
  DriverEvent,
  OndemandEvent,
} from '@/helpers/defaultDcaList';

export interface DcaState {
  dcaData: {
    isLoading: boolean;
    dcaEventAlerts: onDemandElements[];
    dcaEventEachCountsList: DcaEventEachCountsList;
  };
}

export const state = (): DcaState => ({
  ...defaultState(),
});

const defaultState = (): DcaState => {
  return {
    dcaData: {
      isLoading: false,
      dcaEventAlerts: [],
      dcaEventEachCountsList: {
        driveSafetyEvent: DriveSafetyEvent,
        driverCoaching: DriverCoaching,
        externalEvent: ExternalEvent,
        driverEvent: DriverEvent,
        onDemandEvent: OndemandEvent,
      },
    },
  };
};

export enum MutationTypes {
  SET_DCA_STATISTICS_AND_ALERTS = 'SET_DCA_STATISTICS_AND_ALERTS',
}

const mutations: MutationTree<DcaState> = {
  [MutationTypes.SET_DCA_STATISTICS_AND_ALERTS](
    state: DcaState,
    payload: DcaStatisticsAndAlertsResponse['getDcaStatisticsPage']
  ) {
    const { statistics, ondemandResList } = payload;

    statistics.map((statistic) => {
      switch (statistic.parentsEventName) {
        case FMS_CATEGORY_EVENTS.DRIVE_SAFETY_EVENT.name:
          state.dcaData.dcaEventEachCountsList.driveSafetyEvent =
            isIncludeEvents(statistic);
          break;
        case FMS_CATEGORY_EVENTS.DRIVER_COACHING.name:
          state.dcaData.dcaEventEachCountsList.driverCoaching =
            isIncludeEvents(statistic);
          break;
        case FMS_CATEGORY_EVENTS.EXTERNAL_EVENT.name:
          state.dcaData.dcaEventEachCountsList.externalEvent = statistic;
          break;
        case FMS_CATEGORY_EVENTS.DRIVER_EVENT.name:
          state.dcaData.dcaEventEachCountsList.driverEvent =
            isIncludeEvents(statistic);
          break;
        case FMS_CATEGORY_EVENTS.ONDEMAND_EVENT.name:
          state.dcaData.dcaEventEachCountsList.onDemandEvent = statistic;
          break;
      }
    });

    state.dcaData.dcaEventAlerts =
      ondemandResList.length > 0
        ? ondemandResList.filter((ondemand) =>
            isIncludeEvent(ondemand.eventType)
          )
        : [];
  },
};

const actions: ActionTree<DcaState, RootState> = {
  async fetchDcaStatisticsAndAlerts(
    { state, commit, rootState },
    payload: DcaStatisticsAndAlertsPayload
  ) {
    state.dcaData.isLoading = true;

    checkDeviceTypeForPanicEvent(rootState.device.deviceDetail.deviceModelName);

    const {
      data: { getDcaStatisticsPage },
    } = await graphqlClient.query<DcaStatisticsAndAlertsResponse>({
      query: GET_DCA_STATISTICS_AND_ALERTS,
      variables: payload,
      fetchPolicy: 'network-only',
    });

    if (getDcaStatisticsPage) {
      commit(MutationTypes.SET_DCA_STATISTICS_AND_ALERTS, getDcaStatisticsPage);
    }

    state.dcaData.isLoading = false;
  },
};

export const dca: Module<DcaState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};
