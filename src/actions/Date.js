//date actions
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