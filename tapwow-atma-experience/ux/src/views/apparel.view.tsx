import api from '../utils/api.utils'
import { Marker, Type } from '../domain/marker.domain'
import { LoadingSplash } from '../components/shared/loading.component'
import { ErrorSplash } from '../components/shared/error.component'
import { ItemView } from './item.view'
import { ProductView } from './product.view'

type ApparelViewProps = {
  tapwowId: string
}

export function ApparelView({ tapwowId }: ApparelViewProps) {
  const [{ progress, data }] = api.useApi(`{{server}}/marker/${tapwowId}`);

  if (api.inprogress(progress)) {
    return (<LoadingSplash />);
  } else if (api.failed(progress)) {
    return (<ErrorSplash message={'ERROR'} code={api.code(progress)} />);
  }

  const { to: { is, id } } = data as Marker;
  switch (is) {
    case Type.item:
      return (<ItemView tapwowId={tapwowId} id={id} />);
    case Type.product:
      return (<ProductView tapwowId={tapwowId} id={id} />);
  }
}