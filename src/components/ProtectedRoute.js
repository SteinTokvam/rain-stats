import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setUID } from "../actions/User";
import { routes } from "../utils/Urls";

export default function ProtectedRoute({ children }) {

  var uidFromSessionStorage = window.sessionStorage.getItem('uid')
  var uidFromState = useSelector(state => state.rootReducer.user.uid)
  var rememberMe = ""

  const dispatch = useDispatch();

  if(!uidFromSessionStorage && !uidFromState){//sjekker om man må hente fra localstorage eller ikke
    rememberMe = window.localStorage.getItem('rememberMe')
    console.log(rememberMe)
    window.sessionStorage.setItem('uid', rememberMe)
    dispatch(setUID(rememberMe))
  }

  if (!uidFromSessionStorage && !uidFromState && !rememberMe) {
    console.log('går til login fra protected')
    return <Navigate to={routes.login} replace />;
  }

  return children;
    
};