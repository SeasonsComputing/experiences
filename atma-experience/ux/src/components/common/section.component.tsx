import { ContainerProps } from '../../utils/ux.utils'

import './section.component.css'

type SectionProps = ContainerProps & {
  id: string
}

export function Section({ id, children }: SectionProps) {
  return (
    <section className='Section' id={id}>
      {children}
    </section>
  );
}

type SectionHeadingProps = {
  label: string
  text: string
}

export function SectionHeading({ label, text }: SectionHeadingProps) {
  return (
    <div className='SectionHeading'>
      <h2>
        <strong>{label}</strong> <span>{text}</span>
      </h2>
    </div>
  );
}

export function SectionContent({ children }: ContainerProps) {
  return (
    <div className='SectionContent'>
      {children}
    </div>
  );
}

export function Subsection({ children }: ContainerProps) {
  return (
    <div className='Subsection'>
      {children}
    </div>
  );
}