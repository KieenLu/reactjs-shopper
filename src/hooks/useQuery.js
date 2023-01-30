// import { localStorageCache, sessionStorageCache } from "@/utils/cache";
// import { useRef } from "react";
// import { useMemo } from "react";
// import { useEffect, useState } from "react";

// const _cache = {
//   localStorage: localStorageCache,
//   sessionStorage: sessionStorageCache,
// };

// export const useQuery = (options = {}) => {
//   const {
//     queryFn,
//     queryKey,
//     dependencyList = [],
//     enabled = true,
//     cacheTime,
//     storeDriver = "localStorage",
//   } = options;
//   const cache = _cache[storeDriver];
//   const refetchRef = useRef();

//   const [data, setData] = useState();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState();
//   const [status, setStatus] = useState("idle");
//   useEffect(() => {
//     if (typeof refetchRef.current === "boolean") {
//       refetchRef.current = true;
//     }
//   }, dependencyList);

//   useEffect(() => {
//     if (enabled) {
//       fetchData();
//     }
//   }, [queryKey, enabled].concat(...dependencyList));

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setStatus("pending");

//       let res;
//       // Kiểm tra cache xem có dữ liệu hay không
//       if (queryKey && !refetchRef.current) {
//         res = cache.get(queryKey);
//       }

//       if (!res) {
//         res = await queryFn();
//       }

//       setStatus("success");
//       setData(res);

//       // update lại thời gian expired trong trường hợp cache đã tồn tại
//       if (queryKey) {
//         let expired = cacheTime;
//         if (cacheTime) {
//           expired += Date.now();
//         }
//         cache.set(queryKey, res, expired);
//       }

//       refetchRef.current = false;
//     } catch (err) {
//       setError(err);
//       setStatus("error");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return {
//     loading,
//     error,
//     data,
//     status,
//   };
// };

import { localStorageCache, sessionStorageCache } from "@/utils/cache";
import { CanceledError } from "axios";
import { useRef } from "react";
import { useEffect, useState } from "react";

const _cache = {
  localStorage: localStorageCache,
  sessionStorage: sessionStorageCache,
};

// _asyncFunction = {
//     categories: Promise,
//     course-index: Promise,
// }

const _asyncFunction = {};

// B1: loading -> true

// B2: startTime = Thời điểm bắt đầu (miliseconds)

// B3: await api

// B4: endTime = Thời điểm kết thúc

// B5: timeout = endTime - startTime miliseconds

// B6: [Nếu] timeout < 300 -> await delay(300 - timeout)

// B7: return data hoặc throw error

// B8: loading -> false

export const useQuery = ({
  queryFn,
  queryKey,
  dependencyList = [],
  enabled = true,
  cacheTime,
  keepPreviousData,
  limitDuration,
  onSuccess,
  onError,
  storeDriver = "localStorage",
} = {}) => {
  const cache = _cache[storeDriver];
  const refetchRef = useRef();
  // Dùng để lưu trữ các data để sử dụng lại cho keepPreviousData
  const dataRef = useRef({});
  const cacheName = Array.isArray(queryKey)
    ? queryKey?.[0]
    : typeof queryKey === "string"
    ? queryKey
    : undefined;

  const controllerRef = useRef(new AbortController());

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    if (typeof refetchRef.current === "boolean") {
      refetchRef.current = true;
    }
  }, dependencyList);

  useEffect(() => {
    if (enabled) {
      callService();
    }
  }, [enabled].concat(dependencyList, queryKey));

  const getCacheDataOrPreviousData = async () => {
    // Lấy data từ biến lưu trữ
    if (keepPreviousData && cacheName && dataRef.current[cacheName]) {
      return dataRef.current[cacheName];
    }

    // Kiểm tra cache xem có dữ liệu hay không
    if (cacheName && cacheTime && !refetchRef.current) {
      return cache.get(cacheName);
    }

    // Kiểm tra xem có 1 nơi nào khác đang thực thi api này hay không ?
    if (cacheName && _asyncFunction[cacheName]) {
      return await _asyncFunction[cacheName];
    }
  };

  const setCacheDataOrPreviousData = async (data) => {
    // Lưu trữ lại giá trị khi keepPreviousData
    if (keepPreviousData && cacheName) {
      dataRef.current[cacheName] = data;
    }

    // update lại thời gian expired trong trường hợp cache đã tồn tại
    if (cacheName && cacheTime) {
      let expired = cacheTime;
      if (cacheTime) {
        expired += Date.now();
      }
      cache.set(cacheName, data, expired);
    }
  };

  const callService = async (isGetCache = true, ...data) => {
    controllerRef.current.abort();
    controllerRef.current = new AbortController();

    const startTime = Date.now();
    let res;
    let error;

    if (!res) {
      setLoading(true);
      setStatus("pending");

      try {
        if (isGetCache) {
          res = await getCacheDataOrPreviousData();
        }

        if (!res) {
          const asyncFun = queryFn({
            signal: controllerRef.current.signal,
            params: data,
          });

          if (cacheName) {
            _asyncFunction[cacheName] = asyncFun;
          }

          res = await asyncFun;

          delete _asyncFunction[cacheName];
        }

        setCacheDataOrPreviousData(res);
      } catch (err) {
        console.error(err);
        error = err;
      }
    }

    const endTime = Date.now();
    if (limitDuration) {
      const timeout = endTime - startTime;
      if (timeout < limitDuration) {
        await delay(limitDuration - timeout);
      }
    }

    if (res) {
      setLoading(false);
      refetchRef.current = false;
      setStatus("success");
      _setData(res);
      return res;
    } else if (error) {
      if (error instanceof CanceledError) {
        delete _asyncFunction[cacheName];
      } else {
        setLoading(false);
        _setError(error);
        setStatus("error");
        throw error;
      }
    }
  };

  const _setError = (err) => {
    let res;
    if (onError) {
      res = onError(err);
    }
    if (typeof res !== "undefined") {
      setError(res);
    } else {
      setError(data);
    }
  };

  const _setData = (data) => {
    let res;
    if (onSuccess) {
      res = onSuccess(data);
    }
    if (typeof res !== "undefined") {
      setData(res);
    } else {
      setData(data);
    }
  };

  const clearPreviousData = () => {
    dataRef.current = {};
  };

  const callBackgroundApi = async () => {
    let res;
    try {
      if (!res) {
        const asyncFun = queryFn({
          signal: controllerRef.current.signal,
          params: data,
        });

        if (cacheName) {
          _asyncFunction[cacheName] = asyncFun;
        }

        res = await asyncFun;

        delete _asyncFunction[cacheName];
      }

      setCacheDataOrPreviousData(res);
    } catch (err) {
      console.error(err);
    }
    if (res) {
      _setData(res);
    }
  };

  return {
    loading,
    error,
    data,
    status,
    refetch: (...params) => callService(false, ...params),
    clearPreviousData,
    callBackgroundApi,
  };
};

const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));
