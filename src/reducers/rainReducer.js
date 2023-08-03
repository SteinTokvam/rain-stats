const initialState = {
    rainData: [],
    rainDataFiltered: [],
    hourlyRainData: [],
    totalRain: 0
}

const rainReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_RAIN_DATA':
            return {
                ...state,
                rainData: action.payload.toReversed(),
            };
        case 'ADD_RAIN_DATA_FILTERED': 
            return {
                ...state,
                rainDataFiltered: action.payload.toReversed(),
            }
        case 'ADD_TOTAL_RAIN':
            return {
                ...state,
                totalRain: action.payload
            }
        case 'ADD_HOURLY_RAIN_DATA':
            return {
                ...state,
                hourlyRainData: action.payload
            }
        case 'REMOVE_HOURLY_RAIN_DATA':
            return {
                ...state,
                hourlyRainData: action.payload
            }
        case 'LOG_OUT':
            return initialState
        default:
            return state;
    }
};

export default rainReducer;