import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom'
import Landing from './Views/Landing/Landing'
import Home from './Views/Home/Home';
import Detail from './Views/Detail/Detail';
import Create from './Views/Create/Create';
import NavBar from './Components/NavBar/NavBar';
import About from './Views/About/About';
import Favorites from './Views/Favorites/Favorites';

function App() {
  const location = useLocation()

  return (
    <div className="App">
      {location.pathname !== "/" ?  <NavBar /> : null}
      <Routes>
        <Route path='/' Component={Landing}/>
        <Route path='/home' Component={Home}/>
        <Route path='/create' Component={Create}/>
        <Route path='/detail/:id' Component={Detail} />
        <Route path='/favorites' Component={Favorites} />
        <Route path='/about' Component={About} />
      </Routes>
    </div>
  );
}

export default App;
