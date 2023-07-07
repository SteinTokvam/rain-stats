import rainReducer from './rainReducer';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    rain: rainReducer,
});

export default rootReducer;