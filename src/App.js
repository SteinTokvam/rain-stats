import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';


function App() {
  return (
    <Router>
      <div className='App'>
        <section>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/rain-stats' element={ <Dashboard /> } />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
