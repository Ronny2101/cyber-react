import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import reduxlogger from "redux-logger";
import ProductsPageReducer from "./screens/productPage/slice";


export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    //@ts-ignore
  getDefaultMiddleware().concat(reduxlogger),
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductsPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
