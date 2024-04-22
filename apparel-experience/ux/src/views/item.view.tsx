import react from 'react'
import api from 'utils/api.utils'
import items from 'domain/items.api'
import { ExperienceParams } from 'utils/dirx2.utils'
import { ItemAggregate } from 'domain/items.domain'
import { ErrorView } from 'views/error.view'
import { LoadingView } from 'views/loading.view'
import { Apparel } from 'components/apparel/apparel.component'
import { Internals } from 'components/common/internals.component'

type ObserveProps = {
  itemId: string
  params: ExperienceParams
}

const Observe = ({ itemId, params }: ObserveProps) => {
  // record observe event on first entry
  // - this should be moved to dirx2-server-notifier
  react.useEffect(() => {
    const observe = async () => await items.recordItemObservation(itemId, params);
    observe();
  }, []);

  return <></>;
}

type ItemViewProps = {
  params: ExperienceParams
}

export const ItemView = ({ params }: ItemViewProps) => {
  const [{ progress, data }] = items.useItemAggregateByTapwowId(params.tapwowId);

  if (api.inprogress(progress)) {
    return (<LoadingView />);
  } else if (api.failed(progress)) {
    return (<ErrorView message={'ERROR'} code={api.code(progress)} />);
  }

  const aggregate = data as ItemAggregate;
  const { item, trace } = aggregate;
  const { tapwowId, deviceId } = params;

  // remove events with no geo
  aggregate.trace = trace.filter(({ geoLocation }) => geoLocation !== null);

  return (
    <>
      <Apparel
        aggregate={aggregate}
        onRecycle={() => alert('Coming soon')}
        onShare={() => alert('Coming soon')}
        onSizeGuide={() => alert('Coming soon')}
      />
      <Internals fields={{
        'Tapwow ID': tapwowId || '(none)',
        'Device ID': deviceId || '(none)',
        'Article Number': item.ArticleNumber,
        'SKU': item.SKU,
        'GTIN': item.GTIN,
        'Item ID': item.itemId,
        'Production Order': item.productionOrder
      }} />
      <Observe itemId={item.itemId} params={params} />
    </>
  );
}