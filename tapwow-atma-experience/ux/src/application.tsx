import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ErrorSplash } from './components/shared/error.component'
import { LandingView } from './views/landing.view'
import { DetailView } from './views/detail.view'

import './application.css'

export function Application() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <LandingView />
        </Route>
        <Route exact path='/detail'>
          <DetailView />
        </Route>
        <Route>
          <ErrorSplash message={'ERROR'} code={'404'} />
        </Route>
      </Switch>
    </Router>
  );
}