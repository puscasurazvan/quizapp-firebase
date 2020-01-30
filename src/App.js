import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Home from './components/Home'
import Game from './components/Game'
import HighScores from './components/HighScores'

const App = () => {
  return (
    <div className="container">
      <Router>
        <Route exact path='/' component={Home} />
        <Route path='/game' component={Game} />
        <Route path='/highScores' component={HighScores} />
      </Router>
    </div>
  )
}

export default App
