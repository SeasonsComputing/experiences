import { Section, SectionHeading, SectionContent } from 'components/common/section.component'
import { SymbolList, SymbolItem } from 'components/common/symbol.component'

type CareInfoProps = {
  labels: {
    character: string,
    description: string
  }[]
  instructions: string[]
}

export const CareInfo = ({ labels, instructions }: CareInfoProps) => {
  const Labels = () => (
    <SymbolList>
      {labels.map(({ character, description }, i) => (
        <SymbolItem
          key={i}
          character={character}
          description={description}
        />
      ))}
    </SymbolList>
  );

  const Instructions = () => (
    <>
      <h3>Instructions</h3>
      <ul>
        {instructions.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </>
  );

  return !instructions?.length && !labels?.length ? null : (
    <Section id={'care'}>
      <SectionHeading
        label={'Care.'}
        text={'We love our product and expect it to be properly cared for.'}
      />
      <SectionContent>
        {labels?.length && <Labels />}
        {instructions?.length && <Instructions />}
      </SectionContent>
    </Section>
  );
}
