const TOKEN_KEY = "token";
const USER_KEY = "user";
export const setToken = (data) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
};
export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY));
};
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export const setUser = (data) => {
  localStorage.setItem(USER_KEY, JSON.stringify(data));
};
export const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY));
};
export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const createStoreChannel = (key) => {
  let _data;
  try {
    _data = JSON.parse(localStorage.getItem(key)) || {};
  } catch (err) {
    _data = {};
  }
  const set = (name, data) => {
    _data[name] = data;
    localStorage.setItem(key, JSON.stringify(_data));
  };
  const get = (name) => {
    if (name) {
      return _data[name];
    }
    return _data;
  };
  const clear = () => {
    _data = {};
    localStorage.removeItem(key);
  };
  return {
    set,
    get,
    clear,
  };
};

export const preCheckoutStore = createStoreChannel("preCheckout");
