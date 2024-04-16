import { ProductAggregate } from '../domain/atma.domain'
import { Tabs } from '../components/common/tabs.component'
import { Title } from '../components/apparel/title.component'
import { Intro } from '../components/apparel/intro.component'
import { Size } from '../components/apparel/size.component'
import { Materials } from '../components/apparel/materials.component'
import { Care } from '../components/apparel/care.component'
import { Origin } from '../components/apparel/origin.component'

type ApparelViewProps = {
  thing: ProductAggregate
  onRecycle: () => void
  onShare: () => void
  onSizeGuide: () => void
}

export function ApparelView({ 
  thing, onRecycle, 
  onShare, onSizeGuide
 }: ApparelViewProps) {
  return (
    <>
      <Title
        label={thing.care.gender}
        heading={thing.ArticleName}
        price={thing.Price}
        currency={thing.Currency}
        linkLabel={'More information'}
        linkUrl={thing.ProductURL}
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
        text={thing.ProductDescription}
        imageUrl={thing.ImageURL}
        styleCode={thing.care.style}
        styleColor={thing.Color}
        onRecycle={onRecycle}
        onShare={onShare}
      />
      <Size
        size={thing.Size}
        onSizeGuide={onSizeGuide}
      />
      <Materials
        items={thing.care.materials}
      />
      <Care
        labels={thing.care.labels}
        instructions={thing.care.instructions}
      />
      <Origin
        countryOfOrigin={thing.care.countryOfOrigin}
      />
    </>
  );
}