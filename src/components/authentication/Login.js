import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, deletePassword, setUID } from "../../actions/User";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { needsToAuthorizeNetatmo } from "../../NetatmoAuth";
import { handleSignIn } from "../../firebase";

export default function Login() {

    const email = useSelector(state => state.rootReducer.user.email);
    const password = useSelector(state => state.rootReducer.user.password);
    const uid = useSelector(state => state.rootReducer.user.uid);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const searchParams = new URLSearchParams(document.location.search)
        const uidFromParam = searchParams.get('state')

        if((uid !== null && uid) || (uidFromParam != null && uidFromParam)) {
            console.log(uidFromParam)
            console.log(uid)
            
            dispatch(setUID(uid))
            
            navigate('/')
        } 
    }, [uid, navigate, dispatch])

    async function handleSubmit(event) {
        event.preventDefault();

        //sign in user
        const request = {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
        dispatch(deletePassword())
        handleSignIn(request)
            .then(res => {
                console.log(res.uid)
                if(res.uid !== undefined && res.uid.length > 0) {
                    console.log(`res.uid: ${res.uid}`)
                    dispatch(setUID(res.uid))
                    return {message: res.uid, error: false}
                } else {
                    toast.error('Epost eller passord er feil, eller bruker finnes ikke.')
                    return {message:' wrong password or user', error: true}
                }
            })
            .then(async (logged_in) => {
                //if has signed in sucessfully
                console.log(` logged_in.error: ${logged_in.error}`)
                if(!logged_in.error) {
                    console.log('Has logged in. Getting refresh token from firebase.')
                    const hasToken = await fetch('http://localhost:3000/api/firebase/getToken', {
                        method: 'POST',
                        body: JSON.stringify({userId: logged_in.message})
                    }).then(r => r.json())
                    
                    if(hasToken.error) {
                        console.log(`Got token error response: ${hasToken.error} - ${hasToken.message}`)
                    }
                    
                    if(needsToAuthorizeNetatmo(hasToken)) {
                        console.log('Starting authentication run against netatmo.')
                        console.log(`uid før kall: ${logged_in.message}`)
                        
                    } else {
                        console.log('Got token from netatmo already')
                    }
                } else {
                    toast.error('Kunne ikke logge inn. Prøv igjen senere.')
                }
            })
            .catch(e => e.message)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>Logg inn:</h1>
                    <p>E-post:</p>
                    <input type="text" value={email} onChange={(e) => dispatch(setEmail(e.target.value))} />
                    <p>Passord:</p>
                    <input type="password" value={password} onChange={(e) => dispatch(setPassword(e.target.value))}/>
                </div>
                <input type="submit" value="Logg inn" />
            </form>
            <Link to="/forgot">Glemt passord?</Link>
            <p>Har du ikke bruker? <Link to="/register">Register deg!</Link></p>
        </div>
    )
}