import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home.js'
import Navbar from './components/common/Navbar.js'

import Brands from './components/brandsAndGuitars/Brands.js'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/brands' component={Brands} />
        <Route exact path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
