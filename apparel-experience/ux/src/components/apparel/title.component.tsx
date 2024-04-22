import ux from 'utils/ux.utils'

import LinkIcon from 'assets/external_site.svg'

import './title.component.css'

type TitleProps = {
  label: string
  heading: string
  price: number
  currency: string
  linkLabel: string
  linkUrl: string
}

export const Title = ({
  label, heading,
  price, currency,
  linkLabel, linkUrl
}: TitleProps) => (
  <section className='Title'>
    <div className='TitleLabel'>{label}</div>
    <h1>{heading}</h1>
    <div className='TitleInfoLine'>
      <div className='TitleInfoCost'>{ux.formatPrice(price, currency)}</div>
      {linkUrl && (
        <>
          <div className='TitleInfoSeparator'></div>
          <div className='TitleInfoLink'>
            <img src={LinkIcon} alt={linkUrl} />
            <a href={linkUrl} target='_blank' rel='noreferrer'>{linkLabel}</a>
          </div>
        </>
      )}
    </div>
  </section>
);
