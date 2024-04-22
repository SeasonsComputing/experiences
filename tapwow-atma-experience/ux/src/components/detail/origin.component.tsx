import { Section, SectionHeading, SectionContent } from '../shared/section.component'

type OriginProps = {
  countryOfOrigin: string
}

export function Origin({ countryOfOrigin }: OriginProps) {
  return (
    <Section id={'origin'}>
      <SectionHeading
        label={'Origin.'}
        text={countryOfOrigin + '.'}
      />
      <SectionContent>
        <p>
          We control every stage of the production of our products,
          which allows us to control their quality.
        </p>
      </SectionContent>
    </Section>
  );
}