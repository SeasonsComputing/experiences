import dom from 'react-dom'
import { StrictMode } from 'react'
import { Application } from './application'

const index = () => {
  dom.render(
    <StrictMode>
      <Application />
    </StrictMode>,
    document.getElementById('root')
  );
}

index();