import { Section, SectionHeading, SectionContent } from '../common/section.component'

type SizeProps = {
  size: string
  onSizeGuide: () => void
}

export function Size({ size, onSizeGuide }: SizeProps) {
  return (
    <Section id={'size'}>
      <SectionHeading
        label={'Size & fit.'}
        text={`Can't choose the size? Our consultants will help you with the choice.`}
      />
      <SectionContent>
        <p>Apparel size is <strong>{size}</strong></p>
        <button onClick={() => onSizeGuide()}>Size Guide</button>
      </SectionContent>
    </Section>
  );
}