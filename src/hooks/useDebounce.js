import { useRef, useState } from "react";

export const useDebounce = (defaultValue, timing = 300) => {
  const timingRef = useRef();
  const [value, _setValue] = useState(defaultValue);
  const setValue = (value) => {
    if (timingRef.current) {
      clearTimeout(timingRef.current);
    }
    timingRef.current = setTimeout(() => {
      _setValue(value);
      timingRef.current = null;
    }, timing);
  };
  return [value, setValue];
};
