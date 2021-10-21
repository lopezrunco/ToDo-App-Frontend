import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'

import Home from './pages/Home';
import Landing from './pages/Landing'
import Prefs from './pages/Prefs'
import Stats from './pages/Stats'

import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <div className="App">

        {/* Definicion de las rutas para cada uno de los componentes a mostrar */}
        <Switch>
          <Route path="/stats">
            <Nav />
            <Stats />
          </Route>
          <Route path="/prefs">
            <Nav />
            <Prefs />
          </Route>
          <Route path="/home">
            <Nav />
            <Home />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>

      </div>
    </Router>
  )
}


export default App;
