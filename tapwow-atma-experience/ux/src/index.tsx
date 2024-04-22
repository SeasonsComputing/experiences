import dom from 'react-dom'
import { StrictMode } from 'react'
import { Application } from './application'

dom.render(
  <StrictMode>
    <Application />
  </StrictMode>,
  document.getElementById('root')
);