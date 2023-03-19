import { ref } from 'vue';

type DRIVE_TYPE_KEY = 'WHOLE' | 'DRIVE' | 'STOP' | 'ACCIDENT';
type DRIVE_STATUS_KEY = 0 | 100 | 300;

export const DRIVE_TYPE: Record<DRIVE_TYPE_KEY, number> = {
  WHOLE: 0,
  DRIVE: 100,
  STOP: 300,
  ACCIDENT: 500,
} as const;

export const DRIVE_STATUS: Record<DRIVE_STATUS_KEY, string> = {
  0: 'All',
  100: 'Driving',
  300: 'Stopped',
} as const;

export const MAP_ICON_TYPE = {
  100: { default: 'map_drive', selected: 'map_drive_selected' },
  200: { default: '', selected: '' },
  300: { default: 'map_stop', selected: 'map_stop_selected' },
  400: { default: '', selected: '' },
  500: { default: 'map_accident', selected: 'map_accident_selected' },
} as const;

export const MARKER_ANIMATION = {
  BOUNCE: 1,
  DROP: 2,
} as const;

export const CLUSTER_STYLES = [
  {
    width: 50,
    height: 50,
    anchorIcon: [0, 0],
    anchorText: [18, 1],
    url: '../images/cluster/m1.png',
    textColor: 'white',
    textSize: 14,
  },
  {
    width: 50,
    height: 50,
    anchorIcon: [0, 0],
    anchorText: [18, 1],
    url: '../images/cluster/m2.png',
    textColor: 'white',
    textSize: 14,
  },
  {
    width: 50,
    height: 50,
    anchorIcon: [0, 0],
    anchorText: [18, 1],
    url: '../images/cluster/m3.png',
    textColor: 'white',
    textSize: 14,
  },
  {
    width: 50,
    height: 50,
    anchorIcon: [0, 0],
    anchorText: [18, 1],
    url: '../images/cluster/m4.png',
    textColor: 'white',
    textSize: 14,
  },
  {
    width: 50,
    height: 50,
    anchorIcon: [0, 0],
    anchorText: [18, 1],
    url: '../images/cluster/m5.png',
    textColor: 'white',
    textSize: 14,
  },
];

export const GOOGLE_MAP_POLYLINE_ICON = {
  CIRCLE: 0,
  FORWARD_CLOSED_ARROW: 1,
  FORWARD_OPEN_ARROW: 2,
  BACKWARD_CLOSED_ARROW: 3,
  BACKWARD_OPEN_ARROW: 4,
} as const;

// 'rgba(0,255,255,0)',
export const HEATMAP_GRADIENT = {
  default: [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)',
  ],
  safe: [
    'rgba(251,116,12,0)',
    'rgba(241,81,39,1)',
    'rgba(234,57,58,1)',
    'rgba(228,36,75,1)',
    'rgba(221,17,91,1)',
    'rgba(203,12,99,1)',
    'rgba(183,6,108,1)',
    'rgba(168,2,115,1)',
    'rgba(152,0,118,1)',
    'rgba(131,0,116,1)',
    'rgba(114,0,114,1)',
    'rgba(95,0,113,1)',
    'rgba(77,0,104,1)',
    'rgba(59,0,81,1)',
  ],
  economy: [
    'rgba(105,202,96,0)',
    'rgba(90,192,106,1)',
    'rgba(83,185,111,1)',
    'rgba(69,169,123,1)',
    'rgba(52,156,132,1)',
    'rgba(47,151,136,1)',
    'rgba(46,141,138,1)',
    'rgba(49,126,140,1)',
    'rgba(55,110,140,1)',
    'rgba(58,92,139,1)',
    'rgba(62,78,133,1)',
    'rgba(67,54,117,1)',
    'rgba(68,31,99,1)',
    'rgba(67,12,83,1)',
  ],
};

export const GOOGLE_MAP_STYLE = [
  {
    featureType: 'all',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [
      {
        color: '#f2f2f2',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#686868',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#f2f2f2',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: '-22',
      },
      {
        visibility: 'on',
      },
      {
        color: '#b4b4b4',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        saturation: '-51',
      },
      {
        lightness: '11',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text',
    stylers: [
      {
        saturation: '3',
      },
      {
        lightness: '-56',
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: '-52',
      },
      {
        color: '#9094a0',
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        weight: '6.13',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [
      {
        weight: '1.24',
      },
      {
        saturation: '-100',
      },
      {
        lightness: '-10',
      },
      {
        gamma: '0.94',
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#b4b4b4',
      },
      {
        weight: '5.40',
      },
      {
        lightness: '7',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'simplified',
      },
      {
        color: '#231f1f',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'simplified',
      },
      {
        color: '#595151',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        lightness: '-16',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#d7d7d7',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text',
    stylers: [
      {
        color: '#282626',
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        saturation: '-41',
      },
      {
        lightness: '-41',
      },
      {
        color: '#2a4592',
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        weight: '1.10',
      },
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: '-16',
      },
      {
        weight: '0.72',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: '-37',
      },
      {
        color: '#2a4592',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'off',
      },
      {
        color: '#eeed6a',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
      {
        color: '#0a0808',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#b7e4f4',
      },
      {
        visibility: 'on',
      },
    ],
  },
];

export const MAP_OPTIONS = {
  scaleControl: true,
  minZoom: 3,
  maxZoom: 21,
  mapTypeControlOptions: {},
  styles: GOOGLE_MAP_STYLE,
  options: {
    gestureHandling: 'greedy',
  },
} as const;

export const getCurrentLocation = (): { position: any } => {
  // 사용하려는 컴포넌트에서 watch를 이용하여 값 획득 가능
  const latlng = ref();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: any) => {
        latlng.value = {
          ...latlng.value,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      (error: any) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: Infinity,
      }
    );
  } else {
    alert('GPS를 지원하지 않습니다');
  }

  return {
    position: latlng,
  };
};
