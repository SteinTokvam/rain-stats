import {Routes, Route} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {
  return (
      <div className='App'>
        <Routes>
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <SignUp /> } />
          <Route path='/' element={ <Dashboard /> } />
        </Routes>
      </div>
  );
}

export default App;
