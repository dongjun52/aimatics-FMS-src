import { ref } from 'vue';

interface IConfirmAlert {
  title: string;
  content: string;
  type: 'error' | 'success' | 'warning'; // todo: question
  confirm?: boolean;
  ok?: () => void | Promise<void>;
  close?: () => void | Promise<void>;
}

const loading = ref(false);
const visible = ref(false);
const titleValue = ref('');
const typeValue = ref<IConfirmAlert['type']>('success');
const contentValue = ref('');
const confirmValue = ref(false);
const okAction = ref<(() => void | Promise<void>) | null>(null);
const closeAction = ref<(() => void | Promise<void>) | null>(null);

export const useConfirmAlert = () => {
  const open = ({
    title,
    type,
    content,
    confirm = false,
    ok,
    close,
  }: IConfirmAlert): void => {
    loading.value = false;
    visible.value = true;
    titleValue.value = '';
    typeValue.value = 'success';
    contentValue.value = '';
    okAction.value = null;
    closeAction.value = null;

    if (title) titleValue.value = title;
    if (type) typeValue.value = type;
    if (content) contentValue.value = content;
    if (ok) okAction.value = ok;
    if (close) closeAction.value = close;
    confirmValue.value = confirm;
  };

  const loadingConfirm = (): void => {
    loading.value = true;
  };

  const loadingAlert = (): void => {
    loading.value = true;
  };

  const closeAlert = (options?: { close?: () => void }): void => {
    loading.value = false;

    if (options) {
      const { close } = options;
      close && close();
    }

    destroy();
  };

  const resultConfirm = ({
    success,
    message,
    close,
  }: {
    success: boolean;
    message?: string;
    close?: () => void;
  }): void => {
    loading.value = false;
    visible.value = false;

    if (success) {
      open({
        title: message || '저장완료',
        type: 'success',
        content: '',
        confirm: false,
        close: close ? close : undefined,
      });
    } else {
      open({
        title: message || '저장실패',
        type: 'error',
        content:
          '<p>저장중 오류가 발생하였습니다.</p><p>다시 시도해주세요.</p>',
        confirm: false,
      });
    }
  };

  const destroy = (): void => {
    visible.value = false;
    loading.value = false;
    titleValue.value = '';
    typeValue.value = 'success';
    contentValue.value = '';
    okAction.value = null;
  };

  return {
    open,
    destroy,
    resultConfirm,
    loadingConfirm,
    loadingAlert,
    closeAlert,
    okAction,
    closeAction,
    titleValue,
    typeValue,
    contentValue,
    visible,
    loading,
    confirmValue,
  };
};

export default useConfirmAlert;
