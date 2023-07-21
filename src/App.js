import {Routes, Route} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import NetatmoConnector from './components/NetatmoConnector';
import ProtectedRoute from './components/ProtectedRoute';
import NetatmoCodeReciever from './components/NetatmoCodeReciever';


function App() {
  return (
      <div className='App'>
          <div id='content'>
            <Toaster position="top-right"/>
            <Routes>
              <Route path='/login' element={ <NetatmoConnector /> } />
              <Route path='/coderecieved' element={ <NetatmoCodeReciever /> } />
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
