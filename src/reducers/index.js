import rainReducer from './rainReducer';
import dateReducer from './dateReducer';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    rain: rainReducer,
    date: dateReducer,
    user: userReducer,
});

export default rootReducer;