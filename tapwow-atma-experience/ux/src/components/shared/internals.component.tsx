import { Section, SectionHeading, SectionContent } from './section.component'

type InternalsProps = {
  fields: { [k: string]: any }
}

export function Internals({ fields }: InternalsProps) {
  return (
    <Section id={'internals'}>
      <SectionHeading
        label={'Internals.'}
        text={'Identification & tracking numbers.'}
      />
      <SectionContent>
        <ul>
          {
            Object.keys(fields).map((k, i) => (
              <li key={i}><h3>{k}</h3>{fields[k]}</li>
            ))
          }
        </ul>
      </SectionContent>
    </Section>
  );
}