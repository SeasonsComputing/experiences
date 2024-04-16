import { Brand } from 'components/common/brand.component'
import { Footer } from 'components/common/footer.component'

import './landing.page.css'

export const LandingPage = () => (
  <div className='LandingPage'>
    <div className='LandingHeader'>
      <Brand />
      <h2>Touchpoint Apparel</h2>
      <h3>A Tapwow Hand-to-Brand&trade; Experience.</h3>
    </div>
    <Footer />
  </div>
);
