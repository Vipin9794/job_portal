import { configureStore,combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import companySlice from "./companySlice";
import jobSlice from "./jobSlice";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
 import storage from 'redux-persist/lib/storage'



 import applicationSlice from "./applicationSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    auth: authSlice,
    company:companySlice,
    job:jobSlice,
    application:applicationSlice
})

 const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
      }), 
//   reducer: {
//     auth: authSlice,
//     job: jobSlice
//   },
});
export default store;
