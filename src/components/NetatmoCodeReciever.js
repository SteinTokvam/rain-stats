import { useNavigate } from "react-router";
import { getNetatmoToken } from "../NetatmoAuth"
import { useEffect } from "react";


export default function NetatmoCodeReciever(){

    const navigate = useNavigate();

    useEffect(() => {
        console.log('Got authorization_code from Netatmo.');
            getNetatmoToken(sessionStorage.getItem('auth_code')).then(r => r).then(r => {
                //lagre ned
                if(r !== undefined && r.refresh_token !== undefined) {
                    localStorage.setItem('refresh_token', r.refresh_token);
                }
                console.log(r)
                
                if(!r.error) {
                    navigate('/')
                }
                return r;
            });
    }, [navigate])
    return(
        <div>
            <p>Tilbake fra netatmo. lagrer ned godkjenning.</p>{/*TODO: håndter om bruker ikke godkjenner*/ }
        </div>
    )
}