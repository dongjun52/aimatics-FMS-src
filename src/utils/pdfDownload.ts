import html2canvas from 'html2canvas';
import { ImageOptions, jsPDF, jsPDFOptions } from 'jspdf';

export type ImageFormat =
  | 'RGBA'
  | 'UNKNOWN'
  | 'PNG'
  | 'TIFF'
  | 'JPG'
  | 'JPEG'
  | 'JPEG2000'
  | 'GIF87a'
  | 'GIF89a'
  | 'WEBP'
  | 'BMP';

export interface IPDFOptions {
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  fileName: string;
  format: ImageFormat;
}

const pdfDownload = async (
  document: HTMLElement,
  options: IPDFOptions
): Promise<void> => {
  const { position, size, fileName, format } = options;

  await html2canvas(document).then((canvas) => {
    const pdfImage = canvas.toDataURL();
    const pdf = new jsPDF();
    const imageOptions: ImageOptions = {
      imageData: pdfImage,
      x: position.x,
      y: position.y,
      width: size.width,
      height: size.height,
      format: format,
    };

    pdf.addImage(imageOptions);
    pdf.save(fileName);
  });
};

export { pdfDownload };
