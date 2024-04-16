import { ContainerProps } from 'utils/ux.utils'

import './section.component.css'

type SectionProps = ContainerProps & {
  id: string
}

export const Section = ({ id, children }: SectionProps) => (
  <section className='Section' id={id}>
    {children}
  </section>
);

type SectionHeadingProps = {
  label: string
  text: string
}

export const SectionHeading = ({ label, text }: SectionHeadingProps) => (
  <div className='SectionHeading'>
    <h2>
      <strong>{label}</strong> <span>{text}</span>
    </h2>
  </div>
);

export const SectionContent = ({ children }: ContainerProps) => (
  <div className='SectionContent'>
    {children}
  </div>
);

export const Subsection = ({ children }: ContainerProps) => (
  <div className='Subsection'>
    {children}
  </div>
);
