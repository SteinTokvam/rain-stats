import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const uidFromSessionStorage = window.sessionStorage.getItem('uid')
  const uidFromState = useSelector(state => state.rootReducer.user.uid)

    if (!uidFromSessionStorage && !uidFromState) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };