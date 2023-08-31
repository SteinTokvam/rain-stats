import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setUID } from "../actions/User";

export default function ProtectedRoute({ children }) {
  const uidFromSessionStorage = window.sessionStorage.getItem('uid')
  const uidFromState = useSelector(state => state.rootReducer.user.uid)
  const uidFromLocalstorage = window.localStorage.getItem('rememberMe')
  
  if(uidFromLocalstorage) {
    console.log("setter uid fra localstorage")
    window.sessionStorage.setItem('uid', uidFromLocalstorage)
    setUID(uidFromLocalstorage)
  }

    if (!uidFromSessionStorage && !uidFromState) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };