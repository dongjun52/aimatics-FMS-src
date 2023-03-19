import moment from 'moment';
import dayjs from 'dayjs';
import { Ref, ref, UnwrapRef } from 'vue';

export const DATE_FORMAT = {
  DEFAULT: 'YYYY-MM-DD',
  DEFAULT_NO_BAR: 'YYYYMMDD',
  YEAR_MONTH: 'YYYY-MM',
  YEAR: 'YYYY',
} as const;

export const DATE_TERM = {
  MONTHS: 'months',
  WEEKS: 'weeks',
  DAYS: 'days',
} as const;

export const noBarDateformat = 'YYYYMMDD';
export const Dateformat = 'YYYY-MM-DD';
export const monthDateFormat = 'YYYY-MM';
export const yearDateFormat = 'YYYY';

export const convertSecondToMinutes = (time: number): string => {
  const minutes = Math.floor(time / 60);

  const m = dayjs().minute(minutes).format('mm');
  const s = dayjs()
    .second(time - 60 * minutes)
    .format('ss');

  return `${m}:${s}`;
};

/**
 *
 * @param noBar
 * @returns
 */
export const defaultDate = (
  noBar = false
): { endedAt: Ref<UnwrapRef<string>>; startedAt: Ref<UnwrapRef<string>> } => {
  const dateFormat: string = noBar ? Dateformat : noBarDateformat;
  const startedAt = ref<string>(moment().startOf('month').format(dateFormat));
  const endedAt = ref<string>(moment().endOf('month').format(dateFormat));

  return {
    startedAt,
    endedAt,
  };
};

export const MonthAgoFromToday = (amount: any = 1, unit: any = 'months') => {
  const before = ref<string>(
    moment().subtract(amount, unit).format('YYYY-MM-DD')
  );
  const today = ref<string>(moment().format('YYYY-MM-DD'));

  return {
    before,
    today,
  };
};

/**
 * 현재의 요일을 반환
 * @returns
 */
export const getDayOfWeek = (): string => {
  let dayOfWeek: string = '';

  switch (moment().day()) {
    case 0:
      dayOfWeek = '일요일';
      break;
    case 1:
      dayOfWeek = '월요일';
      break;
    case 2:
      dayOfWeek = '화요일';
      break;
    case 3:
      dayOfWeek = '수요일';
      break;
    case 4:
      dayOfWeek = '목요일';
      break;
    case 5:
      dayOfWeek = '금요일';
      break;
    case 6:
      dayOfWeek = '토요일';
      break;
    default:
      break;
  }

  return dayOfWeek;
};

export const convertSecondsToTime = (duration: number) => {
  const date = new Date(1000 * duration);
  return date.toISOString().substr(11, 8);
};
