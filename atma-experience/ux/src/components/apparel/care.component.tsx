import { Section, SectionHeading, SectionContent } from '../common/section.component'
import { SymbolList, SymbolItem } from '../common/symbol.component'

type CareProps = {
  labels: {
    character: string,
    description: string
  }[]
  instructions: string[]
}

export function Care({ labels, instructions }: CareProps) {
  if (!labels?.length || !instructions?.length) {
    return null;
  }

  return (
    <Section id={'care'}>
      <SectionHeading
        label={'Care.'}
        text={'We love our product and expect it to be properly cared for.'}
      />
      <SectionContent>
        <SymbolList>
          {labels.map(({ character, description }, i) => (
            <SymbolItem
              key={i}
              character={character}
              description={description}
            />
          ))}
        </SymbolList>
        <h3>Instructions</h3>
        <ul>
          {instructions.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </SectionContent>
    </Section>
  );
}