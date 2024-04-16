import { Brand } from '../components/common/brand.component'
import { Footer } from '../components/common/footer.component'

import './landing.page.css'

export function LandingPage() {
  return (
    <div className='LandingPage'>
      <div className='LandingHeader'>
        <Brand />
        <h2>Apparel Hand-to-Brand&trade; Experience</h2>
      </div>
      <Footer />
    </div>
  );
}