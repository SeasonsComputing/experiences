import React from 'react';
import { Facility, Space } from '../hotel.domain';

import TapwowLogo from '../assets/tapwow-logo.svg';
import TapwowBrand from '../assets/tapwow-brand.svg';
import TapwowError from '../assets/tapwow-error-ill.svg';
import '../app.css';

export enum LoadingState {
  initiated, done, error
};

export type ActivationContext = {
  tagId: string;
  deviceId: string;
};

export type CoreState = {
  loading: LoadingState;
};

export type CoreProps = {
  context: ActivationContext;
  facility: Facility;
  space: Space;
};

export function LoadingView() {
  return (<div className='App' />);
}

export function ErrorView() {
  return (
    <div className='App dark'>
      <div className='App-error'>
        <img className='justified' src={TapwowError} alt='OOPS! Something went wrong...' />
      </div>
      <footer className='App-footer sticky-bottom'>
        <p>Powered by</p>
        <img src={TapwowBrand} alt='#' width='135' height='18.75' />
      </footer>
    </div>
  );
}

export function SpaceHeader(props: CoreProps) {
  return (
    <header className='App-header'>
      <div className='App-header-container'>
        <img
          className='App-logo spin-effect'
          src={TapwowLogo}
          alt={props.facility.label} />
        <h1>{props.space.label}</h1>
        <p className='subheading'>{props.facility.label}</p>
      </div>
    </header>
  );
}

export function SpaceFooter(props: CoreProps) {
  return (
    <footer className='App-footer sticky-bottom'>
      <p>Powered by</p>
      <img src={TapwowBrand} alt='Powered by Tapwow' width='135' height='18.75' />
    </footer>
  );
}
