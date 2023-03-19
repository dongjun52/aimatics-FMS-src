import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const GET_DEVICE_INFO_LIST: DocumentNode = gql`
  query GetDeviceInfoList(
    $partnersIds: [Int!]!
    $keyword: String
    $pageNum: Int
    $pageSize: Int
    $condition: Condition
  ) {
    getDeviceInfoList(
      partnersIds: $partnersIds
      keyword: $keyword
      pageNum: $pageNum
      pageSize: $pageSize
      condition: $condition
    ) {
      size
      totalPages
      totalElements
      content {
        devicesId
        serial
        deviceModelName
        partners {
          partnersId
          partnersName
        }
        devices {
          lastLogDate
        }
        installerRegistrations {
          updatedAt
        }
        isConnected
      }
    }
  }
`;

export const GET_DEVICE_BY_SERIAL: DocumentNode = gql`
  query GetDeviceBySerial($serial: String) {
    getDeviceInfoData(serial: $serial) {
      devicesId
      serial
      deviceModelName
      partners {
        partnersId
        partnersName
      }
      devices {
        lastLogDate
      }
      installerRegistrations {
        updatedAt
      }
      isConnected
    }
  }
`;
