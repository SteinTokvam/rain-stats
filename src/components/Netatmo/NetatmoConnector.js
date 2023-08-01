import { authenticateWithNetatmo } from "../../utils/NetatmoAuth";
    
function handleSubmit(event) {
    event.preventDefault();
    authenticateWithNetatmo(crypto.randomUUID())
}

export default function NetatmoConnector() {

    return(
        <div>
            <p>For å se din data, så trenger du å godta at denne appen henter din data fra Natatmo.</p>
            <form onSubmit={handleSubmit}>
                <input type="submit" value="Logg inn med Netatmo" />
            </form>
        </div>
    )
}