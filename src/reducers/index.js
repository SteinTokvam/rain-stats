import rainReducer from './rainReducer';
import dateReducer from './dateReducer';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import siteReducer from './siteReducer';

const rootReducer = combineReducers({
    rain: rainReducer,
    date: dateReducer,
    user: userReducer,
    site: siteReducer
});

export default rootReducer;