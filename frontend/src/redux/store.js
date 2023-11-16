import { configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { encryptTransform }  from "redux-persist-transform-encrypt";
import userReducer from "./userSlice"

// Configura un transformador de cifrado con una clave secreta
const encryptor = encryptTransform({
    secretKey: process.env.REACT_APP_REDUX_ENCRYPT_KEY
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
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
            ignoredActions: [PERSIST],
            //La propiedad ignoredActions permite especificar una lista de acciones que no se someterán a la comprobación de serialización. 
            //Esto es útil cuando tienes acciones que contienen datos no serializables (por ejemplo, funciones o referencias circulares) y 
            //no deseas que Redux arroje advertencias o errores debido a esos datos no serializables.

            //estamos utilizando ignoredActions: [PERSIST], lo que significa que estás diciendo explícitamente a Redux que ignore la acción PERSIST 
            //en la comprobación de serialización. La acción PERSIST es una acción interna utilizada por Redux Persist para gestionar la persistencia 
            //de datos en el almacenamiento (como el almacenamiento local o el almacenamiento en memoria). Como esta acción implica la manipulación 
            //de datos persistentes, no es serializable en sí misma, por lo que es común excluir PERSIST de la comprobación de serialización.
          }
    })
})

export const persistor = persistStore(store);