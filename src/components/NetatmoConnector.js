import { useEffect } from "react";
import { authenticateWithNetatmo, getNetatmoToken, getQueryCode, hasSavedUUID } from "../NetatmoAuth";
import { useNavigate } from "react-router";
    
function handleSubmit(event) {
    event.preventDefault();
    authenticateWithNetatmo(crypto.randomUUID())
}

export default function NetatmoConnector() {

    const navigate = useNavigate();

    useEffect(() => {
        if(hasSavedUUID()) {
            getQueryCode().then(res => {
                if(res.error) {
                    console.error(`Failed to get authorization code from Netatmo.`)
                    return
                }
                console.log('Got authorization_code from Netatmo.');
                getNetatmoToken(res)
            })
        } else {
            console.warn("Couldn't get code from Netatmo.")
        }
    }, [navigate]);

    return(
        <div>
            <p>For å se din data, så trenger du å godta at denne appen henter din data fra Natatmo.</p>
            <form onSubmit={handleSubmit}>
                <input type="submit" value="Logg inn med Netatmo" />
            </form>
        </div>
    )
}