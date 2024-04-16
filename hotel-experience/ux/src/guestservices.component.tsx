import React from 'react';
import {
  LoadingState, LoadingView, ErrorView,
  SpaceHeader, SpaceFooter
} from './core.component';
import { ChecklistView } from './checklist.component';

import GuestServicesDndOn from './guestservices/dnd-on.svg';
import GuestServicesDndOff from './guestservices/dnd-off.svg';
import GuestServicesCall from './guestservices/call.svg';
import GuestServicesCleanliness from './guestservices/cleanliness-report.svg';
import GuestServicesLaundry from './guestservices/laundry-service.svg';
import GuestServicesMenus from './guestservices/restaurant-menus.svg';
import GuestServicesDining from './guestservices/inroom-dining.svg';
import './app.css';

export class GuestServicesView extends ChecklistView {
  onDoNotDisturb() {
    this.props.onSubmit && (this.props.onSubmit as () => void)();
  }

  onCleanlinessReport() {
    window.location.pathname = '/housekeeping/report';
  }

  render() {
    const sz = 40;
    switch (this.state.loading) {
      case LoadingState.initiated:
        return (<LoadingView />);
      case LoadingState.error:
        return (<ErrorView />);
      case LoadingState.done:
        this.renderTitle();
        return (
          <div className='App'>
            <div className='App-full-height'>
              <SpaceHeader
                context={this.props.context}
                facility={this.props.facility}
                space={this.props.space} />
              <div className='GuestServices-container'>
                <div className='GuestServices-row'>
                  <div className='GuestServices-item'>
                    <a href='/'
                      onClick={e => { this.onDoNotDisturb(); e.preventDefault() }}
                    >
                      <img src={this.props.space.dnd ? GuestServicesDndOn : GuestServicesDndOff} alt='#' width={sz} height={sz} />
                      <label>Do not disturb</label>
                    </a>
                  </div>
                  <div className='GuestServices-item'>
                    <a href='tel:1-346-901-6035'>
                      <img src={GuestServicesCall} alt='#' width={sz} height={sz} />
                      <label>Call guest services</label>
                    </a>
                  </div>
                </div>
                <div className='GuestServices-row'>
                  <div className='GuestServices-item'>
                    <a href='/'
                      onClick={e => { this.onCleanlinessReport(); e.preventDefault() }}
                    >
                      <img src={GuestServicesCleanliness} alt='#' width={sz} height={sz} />
                      <label>Cleanliness report</label>
                    </a>
                  </div>
                  <div className='GuestServices-item'>
                    <a href='/'>
                      <img src={GuestServicesLaundry} alt='#' width={sz} height={sz} />
                      <label>Laundry service</label>
                    </a>
                  </div>
                </div>
                <div className='GuestServices-row'>
                  <div className='GuestServices-item'>
                    <a href='/'>
                      <img src={GuestServicesDining} alt='#' width={sz} height={sz} />
                      <label>In-room dining</label>
                    </a>
                  </div>
                  <div className='GuestServices-item'>
                    <a href='/'>
                      <img src={GuestServicesMenus} alt='#' width={sz} height={sz} />
                      <label>Restaurant menus</label>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <SpaceFooter
              context={this.props.context}
              facility={this.props.facility}
              space={this.props.space} />
          </div >
        );
      default:
        console.error(`invalid state loading=${this.state.loading}`);
        return null;
    }
  }
}
