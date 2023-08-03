const initialState = {
    drawerOpen: false,
    drawerDate: '',
    dateUnix: -1
}

const siteReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'TOGGLE_DRAWER':
            return {
                ...state,
                drawerOpen: action.payload.open,
                drawerDate: action.payload.date,
                dateUnix: action.payload.dateUnix
            }
        case 'LOG_OUT':
            return initialState
        default:
            return state;
    }
};

export default siteReducer;