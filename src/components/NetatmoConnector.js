import { useEffect } from "react";
import { authenticateWithNetatmo, getQueryCode, hasSavedUUID } from "../NetatmoAuth";
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
                sessionStorage.setItem('auth_code', res)
                navigate('/coderecieved')
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