declare module 'vue3-clipboard' {
  export const copyText = (
    text: string,
    container?: object | HTMLElement,
    callback: (error: any, event: any) => void
  ) =>
    Promise<{
      action: string;
      text: string;
      trigger: String | HTMLElement | HTMLCollection | NodeList;
      clearSelection: () => void;
    }>();
}
