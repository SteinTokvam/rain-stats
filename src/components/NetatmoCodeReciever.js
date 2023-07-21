import { useEffect } from "react"
import { getQueryCode } from "../NetatmoAuth"


export default function NetatmoCodeReciever(){

    return(
        <div>
            <p>Tilbake fra netatmo. lagrer ned godkjenning.</p>{/*TODO: håndter om bruker ikke godkjenner*/ }
        </div>
    )
}