import { ProductAggregate } from '../../domain/atma.domain'
import { Tabs } from '../shared/tabs.component'
import { Title } from './title.component'
import { Intro } from './intro.component'
import { Size } from './size.component'
import { Materials } from './materials.component'
import { Care } from './care.component'
import { Origin } from './origin.component'

type ArticleProps = {
  thing: ProductAggregate
  onRecycle: () => void
  onShare: () => void
  onSizeGuide: () => void
}

export function Article({ 
  thing,
  onRecycle,
  onShare,
  onSizeGuide
 }: ArticleProps) {
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
          { label: 'Origin', target: 'origin' }
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