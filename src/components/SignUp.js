import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword } from "../actions/User";

export default function SignUp(){
    const email = useSelector(state => state.rootReducer.user.email);
    const password = useSelector(state => state.rootReducer.user.password);
    const [tmpPass, setTmpPass] = useState('');

    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();
        const req = {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
        console.log(req)
        if(validatePassword(tmpPass)) {
            fetch('https://rain-stats-serverless.vercel.app/api/user/signup', req)
            .then(response => response.json())
            .then(res => console.log(res))
        } else {
            console.warn("Passord er ikke like")
        }
        
    }

    function validatePassword(passwordRepeat) {
        return passwordRepeat === password
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>E-post:</p>
                    <input type="text" value={email} onChange={(e) => dispatch(setEmail(e.target.value))}/>
                    <p>Passord:</p>
                    <input type="password" value={password} onChange={(e) => dispatch(setPassword(e.target.value))}/>
                    <p>Gjenta passord:</p>
                    <input type="password" value={tmpPass} onChange={e => setTmpPass(e.target.value)}/>
                </div>
                <input type="submit" value="Logg inn" />
            </form>
        </div>
    )
}