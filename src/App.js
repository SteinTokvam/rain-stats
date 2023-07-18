import {Routes, Route} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Footer from './components/Footer';


function App() {
  return (
      <div className='App'>
          <div id='content'>
            <Routes>
              <Route path='/login' element={ <Login /> } />
              <Route path='/register' element={ <SignUp /> } />
              <Route path='/' element={ <Dashboard /> } />
            </Routes>
          </div>
        <Footer  />
      </div>
  );
}

export default App;
