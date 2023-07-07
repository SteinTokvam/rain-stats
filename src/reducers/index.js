import rainReducer from './rainReducer';
import dateReducer from './dateReducer';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    rain: rainReducer,
    date: dateReducer
});

export default rootReducer;