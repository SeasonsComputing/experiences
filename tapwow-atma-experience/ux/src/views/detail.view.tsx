import dirx2 from '../utils/dirx2.utils'
import { Header } from '../components/shared/header.component'
import { Footer } from '../components/shared/footer.component'
import { ApparelView } from './apparel.view'

import './detail.view.css'

export function DetailView() {
  const [{ tapwowId }] = dirx2.useExperience();

  if (!tapwowId) {
    window.location.pathname = '/';    
    return null;
  }

  return (
    <div className='DetailView'>
      <Header />
      <ApparelView tapwowId={tapwowId} />
      <Footer />
    </div>
  );
}