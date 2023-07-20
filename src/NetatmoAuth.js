const searchParams = new URLSearchParams(document.location.search)

export const needsToAuthorizeNetatmo = (token) => token.error === 'NO_REFRESH_TOKEN'


/**
 * Denne metoden er ikke klar enda.
 * 
 * Den skal sjekke om den aktuelle brukeren har autentisert seg mot netatmo eller ikke. har den det så går vi videre. har den ikke det så 
 * må man i gang med autentiseringsflyten.
 * Denne metoden redirecter deg til netatmo, som etter man godkjenner/avslår sender deg til dashboardet som har mer kode for å hente ut refresh_token
 * @see getQueryCode()
 */
 export function authenticateWithNetatmo(uid){
    window.sessionStorage.setItem("uid", uid);
    
    window.location.replace(`https://api.netatmo.com/oauth2/authorize?client_id=649c317ca3c5ae50f30b6bea&redirect_uri=http://localhost:3001/rain-stats&scope=read_station&state=${uid}`)
}

/*
* Dette er en metode som skal kalles etter at bruker logger inn/registerer seg og ikke har autentisert seg mot netatmo enda.
* Når brukeren får denne koden, så henter man ut refresh_token, som lagres i firebase, sammen med en variabel som settes til true.
* Kan så sjekke om brukeren har denne variabelen, så dropper man å prøve å reautentisere seg på nytt.
* Metoden er ikke i bruk enda!
*/
export async function getQueryCode() {
    const uid = window.sessionStorage.getItem("uid");
    if(uid === null) {
        console.log('uid er ikke satt.. ting er under utvikling enda')
        return
    }
    if(uid === searchParams.get('state')) {//etter å ha autentisert så kjører denne en gang til pga uid forandrer seg som kaller på hooken i login. da prøver den å lagre token og tryner
        console.log('UID er lik.');
        const netatmoToken = await fetch('http://localhost:3000/api/netatmo/token', {
            method: 'POST',
            body: JSON.stringify({'auth_code': searchParams.get('code')})
        }).then(r => r.json())

        fetch('http://localhost:3000/api/firebase/token', {
            method: 'POST',
            body: JSON.stringify({
                uid: uid,
                refreshToken: netatmoToken.refresh_token
            })
        })

    } else if(searchParams.get('error') === 'access_denied') {
        console.log('Brukeren aksepterte ikke at vi kan hente data fra netatmo')
    } else {
        console.error('UID er IKKE like! ' + uid + ' fra netatmo: ' + searchParams.get('state'))
    }
    console.dir(searchParams)
    return searchParams
}