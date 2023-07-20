import {Routes, Route} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './components/ForgotPassword';


function App() {
  return (
      <div className='App'>
          <div id='content'>
            <Toaster position="top-right"/>
            <Routes>
              <Route path='/login' element={ <Login /> } />
              <Route path='/register' element={ <SignUp /> } />
              <Route path='/forgot' element={ <ForgotPassword /> } />
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
