import { configureStore } from '@reduxjs/toolkit';

import comics from '@redux/reducers/comics';
import admin from '@redux/reducers/admin';
import favorites from '@redux/reducers/favorites';
import global from '@redux/reducers/global';
import publishers from '@redux/reducers/publishers';
import ratings from '@redux/reducers/ratings';
import shop from '@redux/reducers/shop';
import user from '@redux/reducers/user';

const reducer = {
    comics,
    admin,
    favorites,
    global,
    publishers,
    ratings,
    shop,
    user,
}

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});

export default store;
