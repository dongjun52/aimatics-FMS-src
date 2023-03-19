const mapKeys = (obj: any, mapper: any) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [mapper(value, key)]: value,
    }),
    {}
  );

export default mapKeys;
