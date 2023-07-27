const searchParams = new URLSearchParams(document.location.search)

const redirect_uri = 'https://steintokvam.github.io/rain-stats/';
const scope = 'read_station'
const client_id = '649c317ca3c5ae50f30b6bea';

export const needsToAuthorizeNetatmo = (token) => token.error === 'NO_REFRESH_TOKEN'


export async function getNetatmoToken(code) {
    const res = await fetch('https://rain-stats-serverless.vercel.app/api/netatmo/token',{
        method: 'POST',
        body:JSON.stringify({
            auth_code: code,
            redirect_uri: redirect_uri
        })
    }).then(r => r.json())

    return res
}

 export function authenticateWithNetatmo(uuid){
    console.log(`uuid: ${uuid}`)
    window.sessionStorage.setItem("uuid", uuid);
    window.location.replace(`https://api.netatmo.com/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${uuid}`)
}

export function hasSavedUUID() {
    return window.sessionStorage.getItem('uuid') !== null
}

export async function getQueryCode() {
    const uuid = window.sessionStorage.getItem("uuid");
    if(uuid === null) {
        console.log('UUID not set. Returning.')
        return {error: true}
    }
    if(uuid === searchParams.get('state') && searchParams.get('code') !== null) {
        console.log('UUID er lik.');
        return(searchParams.get('code'));
    } else if(searchParams.get('error') === 'access_denied') {
        console.log('Brukeren aksepterte ikke at vi kan hente data fra netatmo')
    } else {
        console.error('UUID er IKKE like! ' + uuid + ' fra netatmo: ' + searchParams.get('state'))
    }

    return {error: 'FAILED_TO_OBTAIN_CODE'}
}