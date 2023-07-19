import {configureStore} from '@reduxjs/toolkit';
import customReducers from "./reducers";
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
} from 'redux-persist';
import thunk from 'redux-thunk'

// const reducers = combineReducers({ customReducers });

const persistConfig = {
  key: 'root',
  storage,
};


const persistedReducer = persistReducer(persistConfig, customReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export default store