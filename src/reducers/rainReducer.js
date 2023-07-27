const initialState = {
    rainData: [],
    rainDataFiltered: [],
    totalRain: 0
}

const rainReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_RAIN_DATA':
            return {
                ...state,
                rainData: action.payload
            };
        case 'ADD_RAIN_DATA_FILTERED': 
        return {
            ...state,
            rainDataFiltered: action.payload
        }
        case 'ADD_TOTAL_RAIN':
            return {
                ...state,
                totalRain: action.payload
            }
        case 'LOG_OUT':
            return initialState
        default:
            return state;
    }
};

export default rainReducer;