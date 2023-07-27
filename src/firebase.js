
export async function checkForRefreshToken(uid) {
    const hasToken = await fetch('https://rain-stats-serverless.vercel.app/api/firebase/getToken', {
        method: 'POST',
        body: JSON.stringify({userId: uid})
    })

    const tokenJson = await hasToken.json()
    if(await tokenJson.error === 'NO_REFRESH_TOKEN') {
        return false
    }
    return true
}

export function handleSignIn(requset) {
    return fetch('https://rain-stats-serverless.vercel.app/api/user/signin', requset)
            .then(response => response.json())
}

export function getRefreshTokenFromFirebase(uid) {
    return fetch('https://rain-stats-serverless.vercel.app/api/firebase/getToken', 
        {
            method: 'POST',
            body: JSON.stringify({userId: uid})
        }
    ).then(r => r.json())
}