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

export const addHourlyRainData = (hourlyRainData) => {
    return {
        type: 'ADD_HOURLY_RAIN_DATA',
        payload: hourlyRainData
    }
}

export const removeHourlyData = () => {
    return {
        type: 'REMOVE_HOURLY_RAIN_DATA',
        payload: []
    }
}

export const resetRainData = () => {
    return {
        type: 'RESET_RAIN_DATA',
    };
}

export const addTotalRain = (totalRain) => {
    return {
        type: 'ADD_TOTAL_RAIN',
        payload: totalRain,
    };
};

