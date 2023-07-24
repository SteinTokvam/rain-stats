import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    if (!localStorage.getItem('refresh_token')) {
        console.log('No refresh_token found')
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };