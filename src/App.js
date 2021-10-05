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

          <Nav />

        {/* Definicion de las rutas para cada uno de los componentes a mostrar */}
        <Switch>
          <Route path="/stats">
            <Stats />
          </Route>
          <Route path="/prefs">
            <Prefs />
          </Route>
          <Route path="/home">
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
