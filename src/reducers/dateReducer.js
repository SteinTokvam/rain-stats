const initialState = {
    fraDato: '',
    tilDato: ''
}

const dateReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_FRA_DATO':
            return {
                ...state,
                fraDato: action.payload
            };
        case 'ADD_TIL_DATO':
            return {
                ...state,
                tilDato: action.payload
            };
        case 'LOG_OUT':
            return initialState
        default: 
        return state;
    }
}

export default dateReducer;