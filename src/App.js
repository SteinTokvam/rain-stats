import {Routes, Route} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';


function App() {
  return (
      <div className='App'>
        <Routes>
          <Route path='/' element={ <div> <p>hjem</p> </div> } />
          <Route path='/rain-stats/login' element={ <Login /> } />
          <Route path='/rain-stats' element={ <Dashboard /> } />
        </Routes>
      </div>
  );
}

export default App;
