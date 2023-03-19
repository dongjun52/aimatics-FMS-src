export const numberCommas = (value: number | undefined): string => {
  if (value !== undefined) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return '';
};

export default numberCommas;
