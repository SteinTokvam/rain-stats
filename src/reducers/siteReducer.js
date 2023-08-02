const initialState = {
    drawerOpen: false,
    drawerDate: ''
}

const siteReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'TOGGLE_DRAWER':
            return {
                ...state,
                drawerOpen: action.payload.open,
                drawerDate: action.payload.date
            }
        default:
            return state;
    }
};

export default siteReducer;