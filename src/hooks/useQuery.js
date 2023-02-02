import {
  localStorageCache,
  reduxStorageCache,
  sessionStorageCache,
} from "@/utils/cache";
import { CanceledError } from "axios";
import { useRef } from "react";
import { useEffect, useState } from "react";

const _cache = {
  localStorage: localStorageCache,
  sessionStorage: sessionStorageCache,
  redux: reduxStorageCache,
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
  // const refetchRef = useRef()
  // Dùng để lưu trữ các data để sử dụng lại cho keepPreviousData
  const dataRef = useRef({});
  const cacheName = Array.isArray(queryKey)
    ? queryKey?.[0]
    : typeof queryKey === "string"
    ? queryKey
    : undefined;

  const controllerRef = useRef(new AbortController());

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");
  // useEffect(() => {
  //     if (typeof refetchRef.current === 'boolean') {
  //         refetchRef.current = true
  //     }
  // }, dependencyList)

  useEffect(() => {
    if (enabled) {
      callService();
    }
  }, [enabled].concat(dependencyList, queryKey));

  useEffect(() => {
    return () => {
      controllerRef.current.abort();
      if (cacheName) {
        delete _asyncFunction[cacheName];
      }
    };
  }, []);

  const getCacheDataOrPreviousData = () => {
    if (cacheName) {
      // Lấy data từ biến lưu trữ
      if (keepPreviousData && dataRef.current[cacheName]) {
        return dataRef.current[cacheName];
      }
      // Kiểm tra xem có 1 nơi nào khác đang thực thi api này hay không ?
      if (_asyncFunction[cacheName]) {
        return _asyncFunction[cacheName];
      }

      // Kiểm tra cache xem có dữ liệu hay không
      return cache.get(cacheName);
    }
  };

  const setCacheDataOrPreviousData = (data) => {
    if (cacheName) {
      // Lưu trữ lại giá trị khi keepPreviousData
      if (keepPreviousData) {
        dataRef.current[cacheName] = data;
        return;
      }

      // update lại thời gian expired trong trường hợp cache đã tồn tại
      if (cacheTime) {
        let expired = cacheTime;
        if (cacheTime) {
          expired += Date.now();
        }
        cache.set(cacheName, data, expired);
      }
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
          res = getCacheDataOrPreviousData();
        }

        if (!res) {
          const asyncFun = queryFn({
            signal: controllerRef.current.signal,
            params: data,
          });
          if (cacheName) {
            _asyncFunction[cacheName] = asyncFun;
          }

          res = asyncFun;
        }

        if (res instanceof Promise) {
          res = await res;
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

    if (res && !(res instanceof Promise)) {
      setLoading(false);
      // refetchRef.current = false
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
