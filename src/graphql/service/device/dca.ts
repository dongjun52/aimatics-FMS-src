import { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';
import { GET_EVENT_VIDEO_LIST } from '@/graphql/service/device/eventVideo';

export const GET_DCA_STATISTICS_AND_ALERTS: DocumentNode = gql`
  query getDcaStatisticsAndAlerts(
    $serial: String!
    $startDate: String!
    $endDate: String!
  ) {
    getDcaStatisticsPage(
      serial: $serial
      startDate: $startDate
      endDate: $endDate
    ) {
      statistics {
        eventGroup
        parentsEventName: groupName
        childEvents: events {
          eventType: event
          name
          count
        }
      }
      ondemandResList {
        lat
        lng
        eventTime
        eventTag
        eventType
        alertType: eventTypeName
        videoId
        serial: serialNumber
        encodedFiles
      }
    }
  }
`;

export const GET_DCA_STATISTICS: DocumentNode = gql`
  query GetDcaStatistics(
    $startDate: String!
    $endDate: String!
    $serial: String!
  ) {
    getDcaStatistics(
      startDate: $startDate
      endDate: $endDate
      serial: $serial
    ) {
      eventGroup
      groupName
      events {
        event
        name
        count
      }
    }
  }
`;

export const GET_DCA_EVENT_VIDEO_LIST: DocumentNode = GET_EVENT_VIDEO_LIST;
