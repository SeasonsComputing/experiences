import react from 'react'
import { Header } from '../components/common/header.component'
import { Footer } from '../components/common/footer.component'
import { ItemView } from '../views/item.view'
import { ProductView } from '../views/product.view'

import './common.page.css'

type AtmaPageKind = 'product' | 'item'

type AtmaPageProps = {
  kind: AtmaPageKind
}

export function AtmaPage({ kind }: AtmaPageProps) {
  const pathId = react.useRef(window.location.pathname.split('/').pop()!);
  const id = pathId.current;

  function AtmaView() {
    switch (kind) {
      case 'item':
        return (<ItemView id={id} params={{} as any} />);
      case 'product':
        return (<ProductView id={id} params={{} as any} />);
    }
  }

  return (
    <div className='Page'>
      <Header />
      <AtmaView />
      <Footer />
    </div>
  );
}