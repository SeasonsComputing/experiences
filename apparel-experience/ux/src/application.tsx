import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ErrorView } from 'views/error.view'
import { LandingPage } from 'pages/landing.page'
import { ExperiencePage } from 'pages/experience.page'

import './application.css'

export const Application = () => (
  <Router>
    <Switch>
      <Route exact path='/'>
        <LandingPage />
      </Route>
      <Route exact path='/experience'>
        <ExperiencePage />
      </Route>
      <Route>
        <ErrorView message={'ERROR'} code={'404'} />
      </Route>
    </Switch>
  </Router>
);