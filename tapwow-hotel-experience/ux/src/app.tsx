import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Facility, Space, Activity } from './hotel.domain';
import { HotelService } from './hotel.service';
import { 
  ActivationContext, LoadingState, CoreState, 
  CoreProps, LoadingView, ErrorView,
  SpaceHeader, SpaceFooter 
} from './components/core.component';
import { ChecklistView } from './components/checklist.component';
import { GuestServicesView } from './components/guestservices.component';
import { ActivityView } from './components/activity.component';

import TapwowWelcome from './assets/tapwow-welcome-ill.svg';
import TapwowDoNotDisturb from './assets/tapwow-dnd-ill.svg';
import './app.css';

enum ActivationParameters {
  deviceId = 'deviceId',
  tagId = 'tapWowTagId',
  when = 'timestamp',
  where = 'location'
};

type AppState = CoreState & {
  context: ActivationContext;
  facility: Facility;
  space: Space;
};

function uuidIsEqual(a: string, b: string): boolean {
  return a.replace(/-/g, '') === b.replace(/-/g, '');
}

class App extends Component<{}, AppState> {
  state: AppState = {
    loading: LoadingState.initiated,
    context: {
      tagId: '',
      deviceId: ''
    },
    facility: {
      id: '',
      label: '',
      spaces: []
    },
    space: {
      id: '',
      label: '',
      dnd: false,
      tags: []
    }
  };

  async componentDidMount() {
    try {
      // activation context
      const params = new URLSearchParams(window.location.search);
      const context: ActivationContext = {
        tagId: params.get(ActivationParameters.tagId) || '',
        deviceId: params.get(ActivationParameters.deviceId) || ''
      };
      if (context.tagId === '') {
        throw new Error('missing tag parameter');
      }

      // lookup space from tag
      const facility = await HotelService.getFacility();
      const space = facility.spaces.find(s => s.tags.find(t => uuidIsEqual(t, context.tagId)));
      if (space === undefined) {
        throw new Error(`space not found by tag=${context.tagId}`);
      }

      // initiate state
      this.setState({
        loading: LoadingState.done,
        context,
        facility,
        space
      });
    } catch (e) {
      this.setState({ loading: LoadingState.error });
      console.error(e);
    }
  }

  async toggleDoNotDisturb() {
    const space = this.state.space;
    space.dnd = !space.dnd;
    await HotelService.setDoNotDisturb(space.id, space.dnd);
    this.setState({ space });
  }

  async recordActivity(a: Activity) {
    await HotelService.putActivity(a);
    window.location.pathname = '/';
  }

  loadCleanlinessReport() {
    window.location.pathname = '/housekeeping/report';
  }

  render() {
    switch (this.state.loading) {
      case LoadingState.initiated:
        return (<LoadingView />);
      case LoadingState.error:
        return (<ErrorView />);
      case LoadingState.done:
        return (
          <Router>
            <Switch>
              <Route exact path='/'>
                <HomeView
                  context={this.state.context}
                  facility={this.state.facility}
                  space={this.state.space} />
              </Route>
              <Route exact path='/housekeeping'>
                <ChecklistView
                  context={this.state.context}
                  facility={this.state.facility}
                  space={this.state.space}
                  listId='hk'
                  onSubmit={a => this.recordActivity(a)} />
              </Route>
              <Route exact path='/housekeeping/report'>
                <ActivityView
                  context={this.state.context}
                  facility={this.state.facility}
                  space={this.state.space}
                  listId='hk' />
              </Route>
              <Route exact path='/foodandbeverage'>
                <ChecklistView
                  context={this.state.context}
                  facility={this.state.facility}
                  space={this.state.space}
                  listId='fb'
                  onSubmit={a => this.recordActivity(a)} />
              </Route>
              <Route exact path='/foodandbeverage/report'>
                <ActivityView
                  context={this.state.context}
                  facility={this.state.facility}
                  space={this.state.space}
                  listId='fb' />
              </Route>
              <Route exact path='/guestservices'>
                <GuestServicesView
                  context={this.state.context}
                  facility={this.state.facility}
                  space={this.state.space}
                  listId='gs'
                  onSubmit={() => this.toggleDoNotDisturb()} />
              </Route>
              <Route>
                <ErrorView />
              </Route>
            </Switch>
          </Router>
        );
    }
  }
}

export function HomeView(props: CoreProps) {
  useEffect(() => {
    document.title = `${props.facility.label} - ${props.space.label}`;
  });
  return (
    <div className='App'>
      <div className='App-full-height'>
        <SpaceHeader
          context={props.context}
          facility={props.facility}
          space={props.space} />
        <img
          className='justified'
          src={props.space.dnd ? TapwowDoNotDisturb : TapwowWelcome}
          alt='Welcome to Tapwow Hotel Experience' />
      </div>
      <SpaceFooter
        context={props.context}
        facility={props.facility}
        space={props.space} />
    </div>
  );
}

export default App;
