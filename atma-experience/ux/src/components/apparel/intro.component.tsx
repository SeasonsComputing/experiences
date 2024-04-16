import RecycleIcon from '../../assets/ic_reuse_24px.svg'
import ShareIcon from '../../assets/ic_share_24px.svg'

import './intro.component.css'

type IntroProps = {
  text: string
  imageUrl: string
  styleCode: string
  styleColor: string
  onRecycle: () => void
  onShare: () => void
}

export function Intro({
  text, imageUrl,
  styleCode, styleColor,
  onRecycle, onShare
}: IntroProps) {
  const imageLoaded = (img: HTMLImageElement) => {
    img.classList.add('loaded');
    img.parentElement?.classList.add('loaded');
  }

  return (
    <section className='Intro' id='description'>
      <div className='IntroImage'>
        <img 
          src={imageUrl} alt='Product introduction' 
          onLoad={({ currentTarget: img }) => imageLoaded(img) }
        />
      </div>
      <div className='IntroImageCaption'>
        <p>[<strong>{styleColor}</strong>]</p>
      </div>
      <div className='IntroText'>
        {text}
      </div>
      <div className='IntroFooter'>
        <div className='IntroFooterColumn wide'>
          <h1>{styleCode}</h1>
          <h4>Style</h4>
        </div>
        <div
          className='IntroFooterColumn separators action'
          onClick={() => onRecycle()}
        >
          <img src={RecycleIcon} alt='Recycle' />
          <h4>Recycle</h4>
        </div>
        <div
          className='IntroFooterColumn action'
          onClick={() => onShare()}
        >
          <img src={ShareIcon} alt='Share' />
          <h4>Share</h4>
        </div>
      </div>
    </section>
  );
}