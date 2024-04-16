import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ErrorView } from './views/error.view'
import { LandingPage } from './pages/landing.page'
import { ExperiencePage } from './pages/experience.page'
import { AtmaPage } from './pages/atma.page'

import './application.css'

export function Application() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/tapwow'>
          <ExperiencePage />
        </Route>
        <Route exact path='/atma/item/:id'>
          <AtmaPage kind={'item'} />
        </Route>
        <Route exact path='/atma/product/:id'>
          <AtmaPage kind={'product'} />
        </Route>
        <Route>
          <ErrorView message={'ERROR'} code={'404'} />
        </Route>
      </Switch>
    </Router>
  );
}