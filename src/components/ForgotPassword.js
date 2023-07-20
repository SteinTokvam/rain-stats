import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail } from "../actions/User";
import { toast } from "react-hot-toast";

export default function ForgotPassword(){
    
    const email = useSelector(state => state.rootReducer.user.email);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();
        fetch('https://rain-stats-serverless.vercel.app/api/user/forgot', {
            method: 'POST',
            body: JSON.stringify({
                email: email
            })
        })
        .then((res) => res.json())
        .then(res => {
            if(res.error && res.warn) {
                toast(res.message, {
                    icon: '⚠️',
                  })
            } else if(res.error) {
                toast.error(res.message)
            } else {
                toast.success(res.message)
                navigate('/login')
            }
            return
        })
        .catch(e => console.error(e))
    }   

    return(
        <div>
            <h1>Glemt passord</h1>
            <p>Skriv inn din registrerte e-post:</p>
            <form onSubmit={handleSubmit}>
            <input type='text' value={email} onChange={(e) => dispatch(setEmail(e.target.value))} />
            <input type='submit' value='Send inn' />
            </form>
        </div>
    );
}