import _ from "lodash";

export const isEqual = (obj1, obj2, ...field) => {
  if (field.length > 0)
    return _.isEqual(_.pick(obj1, ...field), _.pick(obj2, ...field));

  return _.isEqual(obj1, obj2);
};
