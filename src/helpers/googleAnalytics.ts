import { event, pageview } from 'vue-gtag';

export const getPageView = (pageName: string): void => {
  pageview({ page_title: pageName });
};
