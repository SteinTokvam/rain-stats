import { base_url } from "./Urls"

export function handleSignIn(requset) {
    return fetch(`${base_url.backend}/api/user/signin`, requset)
            .then(response => response.json())
}

export function getRefreshTokenFromFirebase(uid) {
    return fetch(`${base_url.backend}/api/firebase/getToken`, 
        {
            method: 'POST',
            body: JSON.stringify({userId: uid})
        }
    ).then(r => r.json())
}