import react from 'react'
import api from '../utils/api.utils'
import atma from '../domain/atma.api'
import { ExperienceParams } from '../utils/dirx2.utils'
import { ErrorView } from '../views/error.view'
import { LoadingView } from '../views/loading.view'
import { ApparelView } from './apparel.view'
import { TraceMap } from '../components/apparel/trace-map.component'
import { Trace } from '../components/apparel/trace.component'
import { Internals } from '../components/common/internals.component'
import { ItemAggregate, ProductAggregate } from '../domain/atma.domain'

type GeoCoord = {
  latitude: number
  longitude: number
}

type ItemViewProps = {
  id: string
  params: ExperienceParams
}

export function ItemView({ id, params }: ItemViewProps) {
  const [{ progress, data }] = atma.useItemAggregateById(id);
  const [mapCenter, setMapCenter] = react.useState<GeoCoord>(null!);

  // record observe event on first entry
  // - this should be moved to dirx2-server-notifier
  react.useEffect(() => {
    atma.recordItemObservation(id, params);
  }, []);

  if (api.inprogress(progress)) {
    return (<LoadingView />);
  } else if (api.failed(progress)) {
    return (<ErrorView message={'ERROR'} code={api.code(progress)} />);
  }

  const showGeoCoordOnMap = (geo: GeoCoord) => {
    setMapCenter(geo);
    const node = document.querySelector('.TraceMap') as HTMLDivElement;
    node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // product ⊂ item
  const item = data as ItemAggregate;
  const product = item as ProductAggregate;

  const { tapwowId, deviceId } = params;
  const trace = !item.trace ? [] :
    item.trace.filter(({ geoLocation }) => geoLocation !== null);

  return (
    <main>
      <ApparelView
        thing={item}
        onRecycle={() => alert('Coming soon')}
        onShare={() => alert('Coming soon')}
        onSizeGuide={() => alert('Coming soon')}
      />
      {trace.length &&
        <>
          <TraceMap
            center={(mapCenter || trace[0].geoLocation)}
            trace={trace}
          />
          <Trace
            trace={trace}
            onExploreMap={geo => showGeoCoordOnMap(geo)}
          />
        </>
      }
      <Internals fields={{
        'Tapwow ID': tapwowId || '(none)',
        'Device ID': deviceId || '(none)',
        'Article Number': product.ArticleNumber,
        'SKU': product.SKU,
        'GTIN': product.GTIN,
        'Item ID': item.itemId,
        'Production Order': item.productionOrder
      }} />
    </main>
  );
}