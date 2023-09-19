import {Routes, Route} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './components/authentication/ForgotPassword';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import NetatmoConnector from './components/Netatmo/NetatmoConnector';
import NetatmoCodeReciever from './components/Netatmo/NetatmoCodeReciever';
import { routes } from './utils/Urls';



function App() {
  return (
      <div className='App'>
          <div id='content'>
            <Toaster position="top-right"/>
            <Routes>
              <Route path={routes.login} element={ <Login /> } />
              <Route path={routes.register} element={ <SignUp /> } />
              <Route path={routes.forgotPassword} element={ <ForgotPassword /> } />

              <Route path={routes.connect} element={
                <ProtectedRoute>
                  <NetatmoConnector />
                </ProtectedRoute>
              } />
              <Route path={routes.codeRecieved} element={
                <ProtectedRoute>
                  <NetatmoCodeReciever />
                </ProtectedRoute>
              } />

              <Route path={routes.dashboard} element={ 
              <ProtectedRoute>
                <Dashboard /> 
              </ProtectedRoute>
              } />
            </Routes>
          </div>
        <Footer />
      </div>
  );
}

export default App;
