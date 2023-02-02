import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stories";
import { TranslateProvider } from "./components/TranslateProvider";

import en from "@/locales/en.json";
import cn from "@/locales/cn.json";
import vi from "@/locales/vi.json";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <TranslateProvider translate={{ en, cn, vi }} defaultLanguage="vi">
      <Provider store={store}>
        <App />
      </Provider>
    </TranslateProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
