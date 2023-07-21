import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    if (!useSelector(state => state.rootReducer.user.uid)) {//TODO: må legge inn token fra localStorage eller cookie her
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };