const initialState = {
    email: '',
    password: ''
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
        default:
            return state;
    }
};

export default userReducer;