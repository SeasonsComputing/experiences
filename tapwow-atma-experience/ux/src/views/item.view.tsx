import api from '../utils/api.utils'
import { Internals } from '../components/shared/internals.component'
import { ItemAggregate, ProductAggregate } from '../domain/atma.domain'
import { ErrorSplash } from '../components/shared/error.component'
import { LoadingSplash } from '../components/shared/loading.component'
import { Article } from '../components/detail/article.component'
import { Trace } from '../components/detail/trace.component'

type ItemViewProps = {
  tapwowId: string
  id: string
}

export function ItemView({ tapwowId, id }: ItemViewProps) {
  const [{ progress, data }] = api.useApi(`{{server}}/item/aggregate/${id}`);

  if (api.inprogress(progress)) {
    return (<LoadingSplash />);
  } else if (api.failed(progress)) {
    return (<ErrorSplash message={'ERROR'} code={api.code(progress)} />);
  }

  // product ⊂ item
  const item = data as ItemAggregate;
  const product = item as ProductAggregate;
  return (
    <main>
      <Article
        thing={product}
        onRecycle={() => alert('onRecycle')}
        onShare={() => alert('onShare')}
        onSizeGuide={() => alert('onSizeGuide')}
      />
      <Trace
        trace={item.trace}
        onExploreMap={() => alert('onExploreMap')}
      />
      <Internals fields={{
        'Tapwow Id': tapwowId,
        'Kind': 'Item (Serialized ID)',
        'SKU': product.SKU,
        'GTIN': product.GTIN,
        'Item Id': item.itemId,
        'Production Order': item.productionOrder
      }} />
    </main>
  );
}