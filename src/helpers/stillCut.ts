type REQEUST_STATUS_KEY =
  | 'NOT_YET'
  | 'LOADING'
  | 'LOADING2'
  | 'SUCCESS'
  | 'BAD_REQUEST'
  | 'NOT_FOUND';

type REQUEST_STATUS_RETURN_KEY =
  | 'status'
  | 'btnClass'
  | 'btnName'
  | 'event'
  | 'fontColor';

type CHECK_STATUS_KEY =
  | 'NEITHER_REQUESTED'
  | 'ONLY_IMAGE_REQUESTED'
  | 'BOTH_SUCCEEDED'
  | 'REQUESTING'
  | 'ONE_OF_THE_TWO_NOT_FOUND'
  | 'ONE_OF_THE_TWO_BAD_REQUEST';

export type REQUEST_STATUS_RETURN = Readonly<
  Record<REQUEST_STATUS_RETURN_KEY, string>
>;

type REQUEST_STATUS = Readonly<Record<REQEUST_STATUS_KEY, number>>;

type CHECK_STATUS_TYPE = Readonly<Record<CHECK_STATUS_KEY, boolean>>;

const CAN_REQUEST_IMAGE: REQUEST_STATUS_RETURN = {
  status: '-',
  btnClass: 'btn btn_md btn_white',
  btnName: 'Image Reqeust',
  event: 'image',
  fontColor: '',
};

const REQUESTING: REQUEST_STATUS_RETURN = {
  status: 'Requesting...',
  btnClass: 'btn btn_md btn_gray',
  btnName: 'Requesting...',
  event: '',
  fontColor: 'ft_gray',
};

const BAD_REQUEST: REQUEST_STATUS_RETURN = {
  status: 'Bad Request',
  btnClass: 'btn btn_md btn_gray',
  btnName: 'Bad Request',
  event: '',
  fontColor: 'ft_red',
};

const NOT_FOUND: REQUEST_STATUS_RETURN = {
  status: 'Not Found',
  btnClass: 'btn btn_md btn_gray',
  btnName: 'Not Found',
  event: '',
  fontColor: 'ft_red',
};

const CAN_REQUEST_VIDEO: REQUEST_STATUS_RETURN = {
  status: 'Image Request Success',
  btnClass: 'btn btn_md btn_white',
  btnName: 'Video Request',
  event: 'video',
  fontColor: '',
};

const VIDEO_REQUEST_SUCCESS: REQUEST_STATUS_RETURN = {
  status: 'Video Request Success',
  btnClass: 'btn btn_md btn_blue',
  btnName: 'Play',
  event: 'play',
  fontColor: 'ft_blueL',
};

export const REQUEST_STATUS: REQUEST_STATUS = {
  NOT_YET: 0,
  LOADING: -1,
  LOADING2: -2,
  SUCCESS: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

export const requestStatus = (
  stillCutStatus: number,
  videoStatus: number
): REQUEST_STATUS_RETURN => {
  const CHECK_STATUS: CHECK_STATUS_TYPE = {
    NEITHER_REQUESTED:
      stillCutStatus === REQUEST_STATUS.NOT_YET &&
      videoStatus === REQUEST_STATUS.NOT_YET,
    ONLY_IMAGE_REQUESTED:
      stillCutStatus === REQUEST_STATUS.SUCCESS &&
      videoStatus === REQUEST_STATUS.NOT_YET,
    BOTH_SUCCEEDED:
      stillCutStatus === REQUEST_STATUS.SUCCESS &&
      videoStatus === REQUEST_STATUS.SUCCESS,
    REQUESTING:
      stillCutStatus === REQUEST_STATUS.LOADING ||
      stillCutStatus === REQUEST_STATUS.LOADING2 ||
      videoStatus === REQUEST_STATUS.LOADING ||
      videoStatus === REQUEST_STATUS.LOADING2,
    ONE_OF_THE_TWO_NOT_FOUND:
      stillCutStatus === REQUEST_STATUS.NOT_FOUND ||
      videoStatus === REQUEST_STATUS.NOT_FOUND,
    ONE_OF_THE_TWO_BAD_REQUEST:
      stillCutStatus === REQUEST_STATUS.BAD_REQUEST ||
      videoStatus === REQUEST_STATUS.BAD_REQUEST,
  } as const;

  switch (true) {
    case CHECK_STATUS.NEITHER_REQUESTED:
      return CAN_REQUEST_IMAGE;
    case CHECK_STATUS.ONLY_IMAGE_REQUESTED:
      return CAN_REQUEST_VIDEO;
    case CHECK_STATUS.BOTH_SUCCEEDED:
      return VIDEO_REQUEST_SUCCESS;
    case CHECK_STATUS.REQUESTING:
      return REQUESTING;
    case CHECK_STATUS.ONE_OF_THE_TWO_BAD_REQUEST:
      return BAD_REQUEST;
    case CHECK_STATUS.ONE_OF_THE_TWO_NOT_FOUND:
      return NOT_FOUND;
    default:
      return CAN_REQUEST_IMAGE;
  }
};
