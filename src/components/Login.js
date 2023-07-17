import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword } from "../actions/User";

export default function Login() {

    const email = useSelector(state => state.rootReducer.user.email);
    const password = useSelector(state => state.rootReducer.user.password);

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
        fetch('https://rain-stats-serverless.vercel.app/api/user/signin', req)
            .then(response => response.json())
            .then(res => console.log(res))
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>E-post:</p>
                    <input type="text" value={email} onChange={(e) => dispatch(setEmail(e.target.value))}/>
                    <p>Passord:</p>
                    <input type="password" value={password} onChange={(e) => dispatch(setPassword(e.target.value))}/>
                </div>
                <input type="submit" value="Logg inn" />
            </form>
        </div>
    )
}