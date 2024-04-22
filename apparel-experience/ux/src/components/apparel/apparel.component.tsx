import react from 'react'
import { ItemAggregate } from 'domain/items.domain'
import { Tabs } from 'components/common/tabs.component'
import { Title } from 'components/apparel/title.component'
import { Intro } from 'components/apparel/intro.component'
import { Size } from 'components/apparel/size.component'
import { Materials } from 'components/apparel/materials.component'
import { CareInfo } from 'components/apparel/care-info.component'
import { Origin } from 'components/apparel/origin.component'
import { TraceMap } from 'components/apparel/trace-map.component'
import { Trace } from 'components/apparel/trace.component'

type GeoCoord = {
  latitude: number
  longitude: number
}

type ApparelProps = {
  aggregate: ItemAggregate
  onRecycle: () => void
  onShare: () => void
  onSizeGuide: () => void
}

export const Apparel = ({
  aggregate: { item, care, trace },
  onRecycle, onShare, onSizeGuide
}: ApparelProps) => {
  const [mapCenter, setMapCenter] = react.useState<GeoCoord>(null!);

  const showGeoCoordOnMap = (geo: GeoCoord) => {
    setMapCenter(geo);
    const node = document.querySelector('.TraceMap') as HTMLDivElement;
    node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <main>
      <Title
        label={care.gender}
        heading={item.ArticleName}
        price={item.Price}
        currency={item.Currency}
        linkLabel={'More information'}
        linkUrl={item.ProductURL}
      />
      <Tabs
        items={[
          { label: 'Description', target: 'description' },
          { label: 'Size & fit', target: 'size' },
          { label: 'Material source', target: 'materials' },
          { label: 'Care', target: 'care' },
          { label: 'Origin', target: 'origin' },
          { label: 'Trace', target: 'trace-map' }
        ]}
      />
      <Intro
        text={item.ProductDescription}
        imageUrl={item.ImageURL}
        styleCode={care.style}
        styleColor={item.Color}
        onRecycle={onRecycle}
        onShare={onShare}
      />
      <Size
        size={item.Size}
        onSizeGuide={onSizeGuide}
      />
      <Materials
        items={care.materials}
      />
      <CareInfo
        labels={care.labels}
        instructions={care.instructions}
      />
      <Origin
        countryOfOrigin={care.countryOfOrigin}
      />
      <TraceMap
        center={(mapCenter || trace[0].geoLocation)}
        trace={trace}
      />
      <Trace
        trace={trace}
        onExploreMap={geo => showGeoCoordOnMap(geo)}
      />
    </main>
  );
}