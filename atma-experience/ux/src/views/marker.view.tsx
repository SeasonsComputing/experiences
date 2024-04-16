import api from '../utils/api.utils'
import marker from '../domain/marker.api'
import { ExperienceParams } from '../utils/dirx2.utils'
import { LoadingView } from '../views/loading.view'
import { ErrorView } from '../views/error.view'
import { ItemView } from './item.view'
import { ProductView } from './product.view'
import { Marker, Type } from '../domain/marker.domain'

type MarkerViewProps = {
  params: ExperienceParams
}

export function MarkerView({ params }: MarkerViewProps) {
  const [{ progress, data }] = marker.useMarkerById(params.tapwowId);

  if (api.inprogress(progress)) {
    return (<LoadingView />);
  } else if (api.failed(progress)) {
    return (<ErrorView message={'ERROR'} code={api.code(progress)} />);
  }

  const { to: { is, id } } = data as Marker;

  switch (is) {
    case Type.item:
      return (<ItemView id={id} params={params} />);
    case Type.product:
      return (<ProductView id={id} params={params} />);
  }
}