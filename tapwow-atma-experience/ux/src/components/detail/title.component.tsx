import LinkIcon from '../../assets/external_site.svg'

import './title.component.css'

type TitleProps = {
  label: string
  heading: string
  price: number
  currency: string
  linkLabel: string
  linkUrl: string
}

export function Title({
  label, heading,
  price, currency,
  linkLabel, linkUrl
}: TitleProps) {
  function formatPrice(price: number) {
    const { format } = Intl.NumberFormat(undefined, { style: 'currency', currency });
    return format(price);
  }

  return (
    <section className='Title'>
      <div className='TitleLabel'>{label}</div>
      <h1>{heading}</h1>
      <div className='TitleInfoLine'>
        <div className='TitleInfoCost'>{formatPrice(price)}</div>
        {linkUrl && (
          <>
            <div className='TitleInfoSeparator'></div>
            <div className='TitleInfoLink'>
              <img src={LinkIcon} alt={linkUrl} />
              <a href={linkUrl}>{linkLabel}</a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}