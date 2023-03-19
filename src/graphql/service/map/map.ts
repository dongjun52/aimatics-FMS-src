import type { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

const MAP_DEVICE_LIST: DocumentNode = gql`
  query lastTripList($companyIds: [Int], $type: Int) {
    lastTripList(companyIds: $companyIds, type: $type) {
      serial
      status: type
      startLat
      startLng
      lat: endLat
      lng: endLng
      companiesId
      companiesName
    }
  }
`;

const MAP_DEVICE_LIST_TABLE: DocumentNode = gql`
  query lastTripPage(
    $companyIds: [Int]
    $pageNo: Int
    $pageSize: Int
    $vehiclesName: String
    $type: Int
  ) {
    lastTripPage(
      companyIds: $companyIds
      pageNo: $pageNo
      pageSize: $pageSize
      vehiclesName: $vehiclesName
      type: $type
    ) {
      totalPages
      total: totalElements
      content {
        serial
        status: type
        startLat
        startLng
        lat: endLat
        lng: endLng
        companiesId
        companiesName
      }
    }
  }
`;

const MAP_DEVICE_COUNT_INFO_BY_STATUS: DocumentNode = gql`
  query getTripCard(
    $companyIds: [Int]
    $tripStartDt: String
    $tripEndDt: String
  ) {
    getTripCard(
      companyIds: $companyIds
      tripStartDt: $tripStartDt
      tripEndDt: $tripEndDt
    ) {
      whole: allDriveCnt
      driving: drivingCnt
      stop: stopDriveCnt
      accident: accidentDriveCnt
    }
  }
`;

const MAP_GET_DEVICE_INFO: DocumentNode = gql`
  query getDeviceInfo($serial: String) {
    getDeviceInfoData(serial: $serial) {
      deviceType: deviceModelName
      devices {
        lastUpdate: lastLogDate
      }
      installerRegistrations {
        installDate: updatedAt
      }
      isConnected
    }
  }
`;

export {
  MAP_DEVICE_LIST,
  MAP_DEVICE_LIST_TABLE,
  MAP_DEVICE_COUNT_INFO_BY_STATUS,
  MAP_GET_DEVICE_INFO,
};
