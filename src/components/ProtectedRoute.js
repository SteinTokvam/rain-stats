import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setUID } from "../actions/User";

export default function ProtectedRoute({ children }) {

  var uidFromSessionStorage = window.sessionStorage.getItem('uid')
  var uidFromState = useSelector(state => state.rootReducer.user.uid)

  const dispatch = useDispatch();

  if(!uidFromSessionStorage && !uidFromState){//sjekker om man må hente fra localstorage eller ikke
    console.log('timeout')
    setTimeout(100)//skittent, men venter litt i håp om at localstorage mounter innen vi kaller på den
    const rememberMe = window.localStorage.getItem('rememberMe')
    console.log(rememberMe)
    console.log("setter uid fra localstorage")
    window.sessionStorage.setItem('uid', rememberMe)
    dispatch(setUID(rememberMe))
  }

  if (!uidFromSessionStorage && !uidFromState) {
    return <Navigate to="/login" replace />;
  }

  return children;
    
};