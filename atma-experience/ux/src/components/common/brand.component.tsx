import Logo from '../../assets/anatomy_logo.svg'

import './brand.component.css'

export function Brand() {
  return (
    <div className='Brand noAnimationOnMobile'>
      <img src={Logo} alt='Brand or logo' /> 
    </div>
  );
}