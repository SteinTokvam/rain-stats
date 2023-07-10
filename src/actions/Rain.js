//rain actions
export const addRainData = (rainData) => {
    return {
        type: 'ADD_RAIN_DATA',
        payload: rainData,
    };
};

export const addRainDataFiltered = (rainDataFiltered) => {
    return {
        type: 'ADD_RAIN_DATA_FILTERED', 
        payload: rainDataFiltered,
    };
};

export const addTotalRain = (totalRain) => {
    return {
        type: 'ADD_TOTAL_RAIN',
        payload: totalRain,
    };
};

