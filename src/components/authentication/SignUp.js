import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePassword, setEmail, setPassword, setUID } from "../../actions/User";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { base_url, routes } from "../../utils/Urls";

export default function SignUp(){
    const email = useSelector(state => state.rootReducer.user.email);
    const password = useSelector(state => state.rootReducer.user.password);
    const [tmpPass, setTmpPass] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const req = {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
        
        if(validatePassword(tmpPass)) {
            fetch(`${base_url.backend}/api/user/signup`, req)
            .then(response => response.json())
            .then(res => {
                if(res.errorCode) {
                    if(res.errorCode === 'auth/weak-password') {
                        toast.error('Passord må inneholde minst 6 tegn.')
                    } else if(res.errorCode === 'auth/email-already-in-use') {
                        toast.error(t => (
                            <span>
                                Det finnes allerede en bruker med denne e-post adressen.
                                <br />
                                <button onClick={() => {
                                    toast.dismiss(t.id)
                                    navigate(routes.login)
                                    }
                                } >
                                    Logg inn
                                </button>
                            </span>
                        ))
                    }
                } 
                if(res.uid.length > 0) {
                    dispatch(deletePassword());
                    setTmpPass('')
                    dispatch(setUID(res.uid))
                    toast.success('Gratulerer med din nye bruker!')
                    navigate(routes.login);
                    return
                }
                
                throw new Error('Kunne ikke logge inn bruker.')
            })
            .catch(e => e.message)
        } else {//TODO: trenger å skrive en feilmelding dersom man prøver å bruke et passord som er for kort
            toast.error('Passordene er ikke skrevet likt.')
        }
    }

    function validatePassword(passwordRepeat) {
        return passwordRepeat === password
    }

    return(
        <div>
            <h1>Register ny bruker</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>E-post:</p>
                    <input type="text" value={email} onChange={(e) => dispatch(setEmail(e.target.value))}/>
                    <p>Passord:</p>
                    <input type="password" value={password} onChange={(e) => dispatch(setPassword(e.target.value))}/>
                    <p>Gjenta passord:</p>
                    <input type="password" value={tmpPass} onChange={e => setTmpPass(e.target.value)}/>
                </div>
                <input type="submit" value="Registrer bruker" />
            </form>
            <p>Har du allerede en bruker? <Link to={routes.login}>Logg inn.</Link></p>
        </div>
    )
}