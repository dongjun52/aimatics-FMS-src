interface DeviceTypeCheckReturn {
  message: string;
  deviceType: string;
  status: string;
  success: boolean;
}

interface DriveLogs {
  seq: number;
  lat: number;
  lng: number;
  dateTime: string;
  speed: number;
  breakVal: number;
  rpmVal: number;
}

interface WaterMarkResponse {
  videos: [
    {
      seq: number;
      id: number;
      status: number;
      smartEvent: boolean;
      dateTime: string;
      eventTime: string;
      realEventTime: string;
      eventSeq: number;
      frontUrl: string;
      rearUrl: string;
      duration: number;
      driveLogs: null | DriveLogs[];
    }
  ];
}

interface RecogResponse {
  lat: number;
  lng: number;
  groupId: null | number;
  driver: {
    companyId: number;
    companyName: string;
  };
  recogVideo: [
    {
      eventTime: string;
      eventSeq: string;
      realEventTime: string;
      duration: number;
      recogFrontUrl: string;
      recogRearUrl: string;
      driveLogs: null | DriveLogs[];
    }
  ];
}

type GetVideoData = { getVideoData: WaterMarkResponse };
type GetRecogVideoData = { getRecogVideoData: RecogResponse };
type VideoDeviceDividor = { videoDeviceDividor: DeviceTypeCheckReturn };

export {
  DriveLogs,
  DeviceTypeCheckReturn,
  GetVideoData,
  GetRecogVideoData,
  WaterMarkResponse,
  RecogResponse,
  VideoDeviceDividor,
};
