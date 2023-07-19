import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    if (!useSelector(state => state.rootReducer.user.uid)) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };