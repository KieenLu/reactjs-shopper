import queryString from "query-string";
import { useSearchParams } from "react-router-dom";

export const useSearch = (defaultValue = {}) => {
  const [search, setSearch] = useSearchParams();

  const value = { ...defaultValue };
  for (const [key, val] of search.entries()) {
    try {
      value[key] = JSON.parse(val || defaultValue[key]);
    } catch (err) {
      // console.error(err, key, val)
      value[key] = val || defaultValue[key];
    }
  }

  const setValue = (valueObj) => {
    const qs = queryString.stringify({ ...value, ...valueObj });
    setSearch(qs);
  };

  return [value, setValue];
};
