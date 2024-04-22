import api from '../utils/api.utils'
import { Internals } from '../components/shared/internals.component'
import { ErrorSplash } from '../components/shared/error.component'
import { LoadingSplash } from '../components/shared/loading.component'
import { Article } from '../components/detail/article.component'
import { ProductAggregate } from '../domain/atma.domain'

type ProductViewProps = {
  tapwowId: string
  id: string
}

export function ProductView({ tapwowId, id }: ProductViewProps) {
  const [{ progress, data }] = api.useApi(`{{server}}/product/aggregate/${id}`);

  if (api.inprogress(progress)) {
    return (<LoadingSplash />);
  } else if (api.failed(progress)) {
    return (<ErrorSplash message={'ERROR'} code={api.code(progress)} />);
  }

  const product = data as ProductAggregate;
  return (
    <main>
      <Article
        thing={product}
        onRecycle={() => alert('onRecycle')}
        onShare={() => alert('onShare')}
        onSizeGuide={() => alert('onSizeGuide')}
      />
      <Internals fields={{
        'Tapwow Id': tapwowId,
        'Kind': 'Product (SKU)',
        'SKU': product.SKU,
        'GTIN': product.GTIN,
      }} />
    </main>
  );
}