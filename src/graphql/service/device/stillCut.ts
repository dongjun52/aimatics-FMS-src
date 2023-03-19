import type { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

const STILL_CUT_LIST: DocumentNode = gql`
  query getStillCutList(
    $serial: String!
    $from: String!
    $pageNum: Int!
    $size: Int!
  ) {
    getStillCutList(
      serial: $serial
      from: $from
      pageNum: $pageNum
      size: $size
    ) {
      number
      size
      totalPages
      totalElements
      content {
        serialNumber
        jpgTime
        currentVideo
        uploaded
        dateTime
        requested
        totalCount
        currentCount
        preSignedThumbnail
        previousVideoes
        lastKey
        stillCutStatus
        videoStatus
        videoCmdKeyList
        stillCutCmdKeyList
        frontVideoUrl
        rearVideoUrl
        videoId
      }
    }
  }
`;

const STILL_CUT_LIST_ONLY_ONE: DocumentNode = gql`
  query getStillCutOne($serial: String!, $time: String!) {
    getStillCutOne(serial: $serial, time: $time) {
      serialNumber
      jpgTime
      currentVideo
      uploaded
      dateTime
      requested
      totalCount
      currentCount
      preSignedThumbnail
      previousVideoes
      lastKey
      stillCutStatus
      videoStatus
      videoCmdKeyList
      stillCutCmdKeyList
      frontVideoUrl
      rearVideoUrl
      videoId
    }
  }
`;

const REQUEST_STILL_CUT_IMAGE: DocumentNode = gql`
  mutation requestJpgCmd($serial: String!, $jpgTime: Int!, $lastKey: Int!) {
    requestJpgCmd(serial: $serial, jpgTime: $jpgTime, lastKey: $lastKey) {
      status
      message
      success
    }
  }
`;

const REQUEST_STILL_CUT_VIDEO: DocumentNode = gql`
  mutation requestVideoCmd($serial: String!, $currentVideo: String!) {
    requestVideoCmd(serial: $serial, currentVideo: $currentVideo) {
      status
      message
      success
    }
  }
`;

export {
  REQUEST_STILL_CUT_IMAGE,
  REQUEST_STILL_CUT_VIDEO,
  STILL_CUT_LIST,
  STILL_CUT_LIST_ONLY_ONE,
};
