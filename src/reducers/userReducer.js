const initialState = {
    email: '',
    password: '',
    uid: ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload
            };
        case 'SET_PASSWORD': 
            return {
                ...state,
                password: action.payload
            }
        case 'DELETE_PASSWORD':
            return {
                ...state,
                password: ''
            }
        case 'SET_UID':
            return {
                ...state,
                uid: action.payload,
            }
        case 'LOG_OUT':
            return initialState
        default:
            return state;
    }
};

export default userReducer;