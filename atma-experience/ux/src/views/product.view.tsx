import api from '../utils/api.utils'
import atma from '../domain/atma.api'
import { ExperienceParams } from '../utils/dirx2.utils'
import { ErrorView } from '../views/error.view'
import { LoadingView } from '../views/loading.view'
import { ApparelView } from './apparel.view'
import { Internals } from '../components/common/internals.component'
import { ProductAggregate } from '../domain/atma.domain'

type ProductViewProps = {
  id: string
  params: ExperienceParams
}

export function ProductView({ id, params }: ProductViewProps) {
  const [{ progress, data }] = atma.useProductAggregateById(id);

  if (api.inprogress(progress)) {
    return (<LoadingView />);
  } else if (api.failed(progress)) {
    return (<ErrorView message={'ERROR'} code={api.code(progress)} />);
  }

  const product = data as ProductAggregate;
  
  const { tapwowId, deviceId } = params;
  
  return (
    <main>
      <ApparelView
        thing={product}
        onRecycle={() => alert('Coming soon')}
        onShare={() => alert('Coming soon')}
        onSizeGuide={() => alert('Coming soon')}
      />
      <Internals fields={{
        'Tapwow ID': tapwowId || '(none)',
        'Device ID': deviceId || '(none)',
        'Article Number': product.ArticleNumber,
        'SKU': product.SKU,
        'GTIN': product.GTIN,
      }} />
    </main>
  );
}