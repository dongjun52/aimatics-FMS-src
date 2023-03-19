import { CheckCircleOutlined } from '@ant-design/icons-vue';
import notification from 'ant-design-vue/es/notification';
import { h } from 'vue';

const NOTIFICATION__TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

interface Notification {
  type: 'success' | 'error';
  message?: string;
  duration?: number;
  description?: string;
}

const notificationIndicator = (options: Notification): void => {
  const { type, message, duration, description } = options;

  if (type === NOTIFICATION__TYPES.SUCCESS) {
    notification[type]({
      message: message || '완료',
      description: '',
      icon: h(CheckCircleOutlined, { style: 'color: #108ee9' }),
      duration: duration || 2,
      class: 'success_notification',
    });
  } else if (type === NOTIFICATION__TYPES.ERROR) {
    notification[type]({
      message: message || '오류',
      description: description || '',
      duration: duration || 2,
      class: 'failed_notification',
    });
  }
};

export { notificationIndicator as notification };
