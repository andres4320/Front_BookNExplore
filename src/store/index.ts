import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { thunk,  ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage";
import authSlice  from "./authSlice";

const persistConfig = {
    key: "root",
    storage,
};

const reducers = combineReducers({
    auth: authSlice,
});

const persistedReducer = persistReducer (persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, 
      }).concat(thunk),
  });

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();