import TapwowLogo from '../../assets/TapWowLogo_dark.png'

import './footer.component.css'

export function Footer() {
  return (
    <footer>
      <h4>Powered by</h4>
      <a href='https://tapwow.net'><img src={TapwowLogo} alt='Tapwow' /></a>
      <h4>Data provided by <strong>atma.io</strong></h4>
    </footer>
  );
}