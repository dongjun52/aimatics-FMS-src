/**
 * Event Video 리스트 조회
 */

export interface EventVideoListContent {
  videoId: number;
  video: string;
  eventType: string;
  eventTag: string;
  time: string;
  eventTypeName: string;
  frontVideoUrl: string;
  backVideoUrl: string;
  encodedFiles: string;
  stillCut: boolean;
}

export interface FetchEventVideoListPayload {
  variables: {
    startDate: string;
    endDate: string;
    serial: string;
    pageSize: number;
    pageNum: number;
  };
}

export interface FetchEventVideoListResponse {
  getEventVideoList: {
    number: number;
    size: number;
    totalPages: number;
    totalElements: number;
    content: Array<{
      videoId: number;
      eventTime: string;
      serialNumber: string;
      encodedFiles: string;
      thumbnails: string;
      cmdId: string;
      cmdId2: string;
      code: number;
      eventType: string;
      eventTag: string;
      eventTypeName: string;
      frontVideoUrl: string;
      backVideoUrl: string;
      isStillCutRequest: boolean;
    }>;
  };
}
