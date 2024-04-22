import { Section, SectionHeading, SectionContent } from 'components/common/section.component'

type OriginProps = {
  countryOfOrigin: string
}

export const Origin = ({ countryOfOrigin }: OriginProps) => (
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
