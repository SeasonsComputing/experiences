import { ContainerProps } from 'utils/ux.utils'

import './symbol.component.css'

export const SymbolList = ({ children }: ContainerProps) => {
  return (
    <ul className='SymbolList'>
      {children}
    </ul>
  );
}

type SymbolItemProps = {
  character: string
  description: string
}

export const SymbolItem = ({ character, description }: SymbolItemProps) => {
  return (
    <li className='SymbolItem'>
      <div className='SymbolGlyph'>{character}</div>
      <div className='SymbolDescription'>{description}</div>
    </li>
  );
}
