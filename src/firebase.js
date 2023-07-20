
export async function checkForRefreshToken() {
    const hasToken = await fetch('http://localhost:3000/api/firebase/getToken', {
        method: 'POST',
        body: JSON.stringify({userId: uid})
    })

    const tokenJson = await hasToken.json()
    if(await tokenJson.error === 'NO_REFRESH_TOKEN') {
        return false
    }
    return true
}