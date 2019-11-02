export const convertFromFields = fields =>
  Object.keys(fields).reduce(
    (acc, key) => ({ ...acc, [key]: fields[key].stringValue || fields[key] }),
    {}
  );

export const convertToFields = data =>
  Object.keys(data).reduce((acc, key) => {
    const val = data[key];
    const fieldValue: { stringValue?: string } = {};

    if (typeof val === 'string') {
      fieldValue.stringValue = val;
    }

    return { ...acc, [key]: fieldValue };
  }, {});

export const buildSnapshot = ({ fields }) => {
  const denormalized = convertFromFields(fields);

  return { data: () => denormalized };
};
