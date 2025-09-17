import { configureStore } from '@reduxjs/toolkit';

import comicsReducer from '../reducers/comicsReducer';
import admin from '../reducers/admin';
import shop_fav_rating from '../reducers/shop_fav_rating';
import filters from '../reducers/filters';
import params from '../reducers/params';
import reviews from '../reducers/reviews';

const reducer = {
    comicsReducer,
    admin,
    shop_fav_rating,
    filters,
    params,
    reviews
}


const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});

export default store;
