import type { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const GET_WATERMARK_VIDEO_DATA: DocumentNode = gql`
  query getVideoData($videoId: Int!) {
    getVideoData(videoId: $videoId) {
      videos {
        seq
        id
        status
        smartEvent
        dateTime
        eventTime
        realEventTime
        eventSeq
        frontUrl
        rearUrl
        duration: totalLogSeq
        driveLogs {
          seq
          lat
          lng
          dateTime
          speed
          breakVal
          rpmVal
        }
      }
    }
  }
`;

export const GET_RECOG_VIDEO_DATA: DocumentNode = gql`
  query getRecogVideoData($videoId: Int!) {
    getRecogVideoData(videoId: $videoId) {
      lat
      lng
      groupId
      driver {
        companyId
        companyName: company
      }
      recogVideo {
        eventTime
        eventSeq
        realEventTime
        duration: totalLogSeq
        recogFrontUrl
        recogRearUrl
        driveLogs {
          seq
          lat
          lng
          dateTime
          speed
          breakVal
          rpmVal
        }
      }
    }
  }
`;

export const CONFIRM_DEVICE_TYPE: DocumentNode = gql`
  query videoDeviceDividor($videoId: Int!) {
    videoDeviceDividor(videoId: $videoId) {
      status
      message
      success
      deviceType: result
    }
  }
`;
