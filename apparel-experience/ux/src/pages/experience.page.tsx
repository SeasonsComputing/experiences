import react from 'react'
import dirx2 from 'utils/dirx2.utils'
import { Header } from 'components/common/header.component'
import { Footer } from 'components/common/footer.component'
import { ItemView } from 'views/item.view'

import './experience.page.css'

export const ExperiencePage = () => {
  const params = react.useRef(dirx2.getExperienceParams());

  // experience with no ID shows landing page
  // - this is a requirement for dirx2-client experience preview
  const { tapwowId } = params.current;
  if (!tapwowId) {
    window.location.pathname = '/';
    return null;
  }

  return (
    <div className='ExperiencePage'>
      <Header />
      <ItemView params={params.current} />
      <Footer />
    </div>
  );
}