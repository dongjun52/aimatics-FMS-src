import Axios, { AxiosResponse } from 'axios';
import fileDownload from 'js-file-download';
import videojs, { VideoJsPlayerOptions } from 'video.js';
import { reactive } from 'vue';

export const videoOptions = (
  playerOptions: VideoJsPlayerOptions,
  controlBars: videojs.ControlBarOptions | undefined = undefined
): any => {
  const { autoplay, muted, controls, preload } = playerOptions;
  const options = reactive<VideoJsPlayerOptions>({
    autoplay: autoplay,
    muted: muted,
    controls: controls,
    preload: preload,
    controlBar: controlBars,
  });

  return {
    options,
  };
};

export const videoFullScreenOptions = (
  playerOptions: VideoJsPlayerOptions,
  controlBars: videojs.ControlBarOptions | undefined = undefined
): any => {
  const { autoplay, muted, controls, preload } = playerOptions;
  const fullScreenPlayOptions = reactive<VideoJsPlayerOptions>({
    autoplay: autoplay,
    muted: muted,
    controls: controls,
    preload: preload,
    controlBar: controlBars,
  });

  return {
    fullScreenPlayOptions,
  };
};

export const videoFullScreen = (selector: string): void => {
  const el = document.querySelector(selector);
  if (el?.requestFullscreen) {
    el.requestFullscreen();
  }
};

export const videoDownload = async (params: {
  url: string;
  fileName: string;
}): Promise<void> => {
  const { url, fileName } = params;
  await Axios.get(url, {
    responseType: 'blob',
  }).then((response: AxiosResponse<any>) => {
    fileDownload(response.data, fileName);
  });
};
