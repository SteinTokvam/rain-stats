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

export const addFraDato = (fraDato) => {
    return {
        type: 'ADD_FRA_DATO',
        payload: fraDato,
    };
};

export const addTilDato = (tilDato) => {
    return {
        type: 'ADD_TIL_DATO',
        payload: tilDato,
    };
};