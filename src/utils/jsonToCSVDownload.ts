import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';

import mapKeys from './mapKeys';

interface jsonToCSVDownloadProps {
  data: any[];
  name?: string;
  labels: any;
}

const isType = (value: any, type: string) => typeof value === type;

const jsonToCSVDownload = ({
  data,
  name = 'data.csv',
  labels,
}: jsonToCSVDownloadProps): Promise<void> => {
  return new Promise((resolve, reject) => {
    const delimiter = ',';
    const encoding = 'utf-8';

    const labelsFunctionGenerator = () => {
      if (
        !isType(labels, 'undefined') &&
        !isType(labels, 'function') &&
        !isType(labels, 'object')
      ) {
        throw new Error('Labels needs to be a function(value,key) or object.');
      }

      if (isType(labels, 'function')) {
        return (item: any) => {
          return mapKeys(item, labels);
        };
      }

      if (isType(labels, 'object')) {
        return (item: any) => {
          return mapKeys(item, (item: any, key: any) => {
            return labels[key] || key;
          });
        };
      }
      return (item: any) => item;
    };

    const cleaningData = () => {
      if (isType(labels, 'undefined')) {
        return data;
      }

      const labelsFunc = labelsFunctionGenerator();
      return data.map((item) => labelsFunc(item));
    };

    const exportableData = () => {
      const filteredData = cleaningData();

      if (!filteredData.length) {
        return null;
      }

      return filteredData;
    };

    const dataExport = exportableData();

    if (!dataExport) {
      console.error('No data to export');
      return;
    }

    let csv = unparse(
      dataExport,
      Object.assign({
        delimiter,
        encoding,
      })
    );
    //Add BOM when UTF-8
    if (encoding === 'utf-8') {
      csv = '\ufeff' + csv;
    }

    const blob = new Blob([csv], {
      type: 'application/csvcharset=' + encoding,
    });

    saveAs(blob, name);
    resolve();
  });
};

export { jsonToCSVDownload };
