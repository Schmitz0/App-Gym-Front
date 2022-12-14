import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ApiQuery } from '../query/api';
import { ApiEcommerce } from '../query/ApiEcommerce';
import currentPage from '../slices/defaultSlice';
import tokenIsValid from '../slices/defaultSlice';
import facilitiesImages from '../slices/defaultSlice';
import staff from '../slices/defaultSlice';
import itemCheckOut from '../slices/defaultSlice';
import isAdminLogged from '../slices/defaultSlice';
import alertDelivery from '../slices/defaultSlice';

export const store = configureStore({
  reducer: {
    currentPage: currentPage,
    tokenIsValid: tokenIsValid,
    facilitiesImages: facilitiesImages,
    staff: staff,
    itemCheckOut: itemCheckOut,
    isAdminLogged: isAdminLogged,
    alertDelivery: alertDelivery,
    [ ApiQuery.reducerPath ]: ApiQuery.reducer,
    [ ApiEcommerce.reducerPath ]: ApiEcommerce.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(ApiQuery.middleware)
    .concat(ApiEcommerce.middleware)
});

setupListeners(store.dispatch);
