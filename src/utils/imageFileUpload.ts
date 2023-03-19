import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import config from '@/config';

export interface ImageUploadParams {
  files: string | Blob | string[] | any;
  keyName?: string;
  type: string;
  id: number | any | string | null;
}

/**
 * 이미지 파일 정보를 통한 이미지 다운로드
 * @param params
 * @returns Promise
 */
export const imageFileUpload = (params: ImageUploadParams) => {
  const { files, type, id } = params;

  const formData = new FormData();
  formData.append('files', files);
  formData.append('type', type);
  formData.append('id', id ? id.toString() : '0');

  return Axios.post(config.profileImageUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response: AxiosResponse) => {
      if (response.data) {
        return response.data.fileUrlList;
      }
    })
    .catch((error: AxiosError) => {
      console.error('Image File Upload error', error.message);
    });
};
