import { useNavigate } from "react-router";
import { getNetatmoToken } from "../../NetatmoAuth"
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { base_url } from "../../utils/Urls";


export default function NetatmoCodeReciever(){
    const uid = useSelector(state => state.rootReducer.user.uid);

    const navigate = useNavigate();

    useEffect(() => {
        console.log('Got authorization_code from Netatmo.');
            getNetatmoToken(sessionStorage.getItem('auth_code')).then(r => r).then(r => {
                //lagre ned
                if(r !== undefined && r.refresh_token !== undefined) {
                    console.log('Got access/refresh token from Netatmo.')
                    fetch(`${base_url.backend}/api/firebase/token`, {
                        method: 'POST',
                        body: JSON.stringify({
                            uid: !uid ? window.sessionStorage.getItem('uid') : uid,
                            refresh_token: r.refresh_token
                        })
                    })
                }

                if(!r.error) {
                    navigate('/')
                    return
                } else {
                    toast.error(r.error)
                }
                return;
            });
    }, [navigate, uid])
    return(
        <div>
            <p>Tilbake fra netatmo. lagrer ned godkjenning.</p>
        </div>
    )
}