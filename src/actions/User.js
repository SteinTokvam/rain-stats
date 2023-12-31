//user actions
export const setEmail = (email) => {
    return {
        type: 'SET_EMAIL',
        payload: email,
    };
};

export const setPassword = (password) => {
    return {
        type: 'SET_PASSWORD',
        payload: password,
    };
};

export const setRememberMe = (rememberMe) => {
    return {
        type: 'SET_REMEMBER_ME',
        payload: rememberMe,
    }
}

export const deletePassword = () => {
    return {
        type: 'DELETE_PASSWORD',
        payload: '',
    };
};

export const setUID = (uid) => {
    return {
        type: 'SET_UID',
        payload: uid,
    };
};

export const logOut = () => {
    return {
        type: 'LOG_OUT',
        payload: '',
    };
};

