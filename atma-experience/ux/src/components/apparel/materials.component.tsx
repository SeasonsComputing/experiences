import ux from '../../utils/ux.utils'
import { Section, SectionHeading, SectionContent } from '../common/section.component'

type MaterialsProps = {
  items: {
    name: string
    percentage: number
  }[]
}

export function Materials({ items }: MaterialsProps) {
  return (
    <Section id={'materials'}>
      <SectionHeading
        label={'Material source.'}
        text={'Our products are manufactured in accordance with health and safety requirements.'}
      />
      <SectionContent>
        <p>
          We are working on minimization of the environmental impact of textile manufacturing.
          Organic textiles are certified textiles made from fibers that are grown in
          controlled and constantly monitored conditions where no chemicals like fertilizers
          and pesticides are used and soil and water where the plants are grown are constantly
          checked for deviation.
        </p>
        <h3>Materials</h3>
        <ul>
          {items.map(({ name, percentage }, i) => (
            <li key={i}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ textAlign: 'right', width: '2.5em' }}>{ux.formatPercentage(percentage)}</div>
                <div style={{ paddingLeft: '10px' }}>{name}</div>
              </div>
            </li>
          ))}
        </ul>
      </SectionContent>
    </Section>
  );
}