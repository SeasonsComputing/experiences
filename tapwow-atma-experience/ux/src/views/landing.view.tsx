import { Brand } from '../components/shared/brand.component'
import { Footer } from '../components/shared/footer.component'

import './landing.view.css'

export function LandingView() {
  return (
    <div className='LandingView'>
      <div className='LandingHeader'>
        <Brand />
        <h2>Apparel Hand-to-Brand&trade; Experience</h2>
      </div>
      <Footer />
    </div>
  );
}