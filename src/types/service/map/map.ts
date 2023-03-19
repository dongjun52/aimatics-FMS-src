interface DeviceList {
  serial: string;
  status: number;
  startLat: number;
  startLng: number;
  lat: number;
  lng: number;
  companiesId: number;
  companiesName: string;
}

interface TableList {
  totalPages: number;
  total: number;
  content: DeviceList[];
}

interface StatusCounts {
  whole: number;
  driving: number;
  stop: number;
  accident: number;
}

type MapDeviceList = { lastTripList: DeviceList[] };
type MapDeviceTableList = { lastTripPage: TableList };
type MapTabCounts = { getTripCard: StatusCounts };

export { DeviceList, MapDeviceList, MapDeviceTableList, MapTabCounts };
