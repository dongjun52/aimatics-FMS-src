export const imageTypeCheck = (fileName: string): boolean => {
  const imageTypeCheck = /(.*?)\.(jpg|jpeg|png)$/;
  return !!fileName.match(imageTypeCheck);
};
