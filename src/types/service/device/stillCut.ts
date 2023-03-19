interface StillCutContent {
  serialNumber: string;
  jpgTime: number;
  currentVideo: string;
  uploaded: boolean;
  dateTime: string;
  requested: boolean;
  totalCount: number | null;
  currentCount: number | null;
  preSignedThumbnail: string | null;
  previousVideoes: [string, string] | [string];
  lastKey: number;
  stillCutStatus: number;
  videoStatus: number;
  videoCmdKeyList: number[];
  stillCutCmdKeyList: number[];
  frontVideoUrl: null | string;
  rearVideoUrl: null | string;
  videoId: null | number;
}

interface AdditionalStillCutContent extends StillCutContent {
  status: string;
  btnClass: string;
  btnName: string;
  event: string;
  fontColor: string;
}

interface RequestReturns {
  status: string;
  message: string;
  success: boolean;
}

interface StillCutList {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  content: StillCutContent[];
}

interface Variables {
  serial: string;
  from: string;
  pageNum: number;
  size: number;
  jpgTime: number;
  lastKey: number;
  time: string;
  currentVideo: string;
}

type StillCutOneVariables = Pick<Variables, 'serial' | 'time'>;
type StillCutListVariables = Pick<
  Variables,
  'serial' | 'from' | 'pageNum' | 'size'
>;
type RequestImgVariables = Pick<
  Variables,
  'serial' | 'jpgTime' | 'lastKey' | 'time'
>;
type RequestVideoVariables = Pick<
  Variables,
  'serial' | 'currentVideo' | 'time'
>;

interface GetStillCutList {
  getStillCutList: StillCutList;
}
interface GetStillCutOne {
  getStillCutOne: StillCutContent;
}
interface RequestJpgCmd {
  requestJpgCmd: RequestReturns;
}
interface RequestVideoCmd {
  requestVideoCmd: RequestReturns;
}

export {
  AdditionalStillCutContent,
  GetStillCutList,
  GetStillCutOne,
  StillCutList,
  StillCutContent,
  StillCutListVariables,
  StillCutOneVariables,
  RequestImgVariables,
  RequestJpgCmd,
  RequestVideoVariables,
  RequestVideoCmd,
  RequestReturns,
};
