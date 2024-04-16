import Logo from 'assets/touchpoint_logo.png'

import './brand.component.css'

export const Brand = () => (
  <div className='Brand noAnimationOnMobile'>
    <img src={Logo} width={110} alt='Brand or logo' />
  </div>
);
