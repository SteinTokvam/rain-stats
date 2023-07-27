import {Routes, Route} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './components/authentication/ForgotPassword';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import NetatmoConnector from './components/Netatmo/NetatmoConnector';
import NetatmoCodeReciever from './components/Netatmo/NetatmoCodeReciever';



function App() {
  return (
      <div className='App'>
          <div id='content'>
            <Toaster position="top-right"/>
            <Routes>
              <Route path='/login' element={ <Login /> } />
              <Route path='/register' element={ <SignUp /> } />
              <Route path='/forgot' element={ <ForgotPassword /> } />

              <Route path='/connect' element={
                <ProtectedRoute>
                  <NetatmoConnector />
                </ProtectedRoute>
              } />
              <Route path='/coderecieved' element={
                <ProtectedRoute>
                  <NetatmoCodeReciever />
                </ProtectedRoute>
              } />

              <Route path='/' element={ 
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
