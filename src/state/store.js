import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./appStateSlice";
import { categoryApi } from "./api/categoryApi";
import { productApi } from "./api/productApi";
import { orderApi } from "./api/orderApi";
import { orderDetailApi } from "./api/orderDetailApi";
import { analyticApi } from "./api/analyticApi";

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [orderDetailApi.reducerPath]: orderDetailApi.reducer,
    [analyticApi.reducerPath]: analyticApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      categoryApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      orderDetailApi.middleware,
      analyticApi.middleware,
    ]),
});
