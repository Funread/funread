import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { encryptTransform }  from "redux-persist-transform-encrypt";
import userReducer from "./userSlice"

// Configura un transformador de cifrado con una clave secreta
const encryptor = encryptTransform({
    secretKey: "j6WW6v8hc-zF}1}Wl&{)+Jadz3&!Uki&Zw'-wsJlJR}&gzzLkZ"
    });
  
  const persistConfig = {
    key: "userSlice",
    storage,
    transforms: [encryptor], // Agrega el transformador de cifrado aquí
  };
  
const persistedReducer = persistReducer(persistConfig, userReducer);


export const store = configureStore({
    reducer: {
        user: persistedReducer
    },
    middleware: getDefaultMiddleware({ //esto esta en desuso, pero fue la unica manera de solucionar un error que se generaba correctamente, no impedia la funcionalidad del persist, pero era un error
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})

export const persistor = persistStore(store);