import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
//Event Video 조회
export const GET_EVENT_VIDEO_LIST: DocumentNode = gql`
  query GetEventVideoList(
    $startDate: String!
    $endDate: String!
    $serial: String
    $pageSize: Int
    $pageNum: Int
  ) {
    getEventVideoList(
      startDate: $startDate
      endDate: $endDate
      serial: $serial
      pageSize: $pageSize
      pageNum: $pageNum
    ) {
      number
      size
      totalPages
      totalElements
      content {
        videoId
        eventTime
        serialNumber
        encodedFiles
        thumbnails
        cmdId
        cmdId2
        code
        eventType
        eventTag
        eventTypeName
        frontVideoUrl
        backVideoUrl
        isStillCutRequest
      }
    }
  }
`;
