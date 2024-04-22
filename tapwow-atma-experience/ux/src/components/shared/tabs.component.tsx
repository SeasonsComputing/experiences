import react from 'react'
import ux from '../../utils/ux.utils'

import './tabs.component.css'

type TabsProps = {
  items: {
    label: string
    target: string
  }[]
}

export function Tabs({ items }: TabsProps) {
  const [tab, setSelectedIndex] = react.useState(0);

  // hide tabs with missing targets
  react.useEffect(() => {
    for (const i in items) {
      const { target } = items[i];
      const node = document.querySelector('#' + target) as HTMLDivElement;
      if (node) continue;

      const tab = document.querySelector('#' + target + '_tab') as HTMLDivElement;
      tab.style.display = 'none';
    }
  }, [items]);

  // select tab as target scrolls into view
  react.useEffect(() => {
    function onScroll() {
      const y = window.scrollY + 46; // pad for tab bar height

      for (const i in items) {
        const { target } = items[i];
        const node = document.querySelector('#' + target) as HTMLDivElement;
        if (!node) continue;

        const min = node.offsetTop;
        const max = min + node.clientHeight;
        if (y > min && y < max) {   
          setSelectedIndex(+i);
          break;
        }
      }
    }

    window.addEventListener('scroll', onScroll, false);
  }, [items]);

  // keep tabs sticky to top
  react.useEffect(() => {
    let sticky = false;
    let initialTop = 0;
    let lastTop = 0;
    let ticking = false;

    function onScroll() {
      lastTop = window.scrollY;
      requestTick();
    }

    function requestTick() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    function update() {
      ticking = false;
      const tabs = document.querySelector('.Tabs') as HTMLDivElement;

      if (!sticky && initialTop === 0) {
        initialTop = tabs.offsetTop;
      } else if (!sticky && lastTop > initialTop) {
        sticky = true;
      } else if (sticky && lastTop < initialTop) {
        sticky = false;
        tabs.style.transform = 'translateY(0px)';
      } else if (sticky) {
        const offset = lastTop - initialTop;
        tabs.style.transform = `translateY(${offset}px)`;
      }
    }

    window.addEventListener('scroll', onScroll, false);
  }, []);

  // drag tab into view (horizontally)
  let firstClientX = react.useRef(0);
  let isFirstDrag = react.useRef(false);

  function onDragStart() { ux.setRef(isFirstDrag, true); }
  function onDragEnd() { ux.setRef(isFirstDrag, false); }
  
  function onDragMove(e: any) {
    const {
      currentTarget: node,
      changedTouches: [{ clientX }]
    } = e;

    if (ux.getRef(isFirstDrag)) {
      ux.setRef(isFirstDrag, false);
      ux.setRef(firstClientX, clientX - node.offsetLeft);
    } else {
      const diff = clientX - ux.getRef(firstClientX);
      const overage = node.parentElement.clientWidth - node.clientWidth; 
      const offset = Math.max(Math.min(0, diff), overage);
      node.style.transform = `translateX(${offset}px)`;
    }
  }

  function activateTab(i: number) {
    // scrolling target into view will select the tab (cool!)
    const target = document.querySelector('#' + items[i].target) as HTMLDivElement;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function makeClassName(i: number) { return i === tab ? 'Tab selected' : 'Tab'; }

  return (
    <div className='Tabs'>
      <div
        className='TabsContainer'
        onTouchStart={() => onDragStart()}
        onTouchEnd={() => onDragEnd()}
        onTouchMove={(e) => onDragMove(e)}
      >
        {
          items.map(({ label, target }, i) => (
            <div
              key={i} id={target + '_tab'}
              className={makeClassName(i)}
              onClick={() => activateTab(i)}
            >
              {label}
            </div>
          ))
        }
      </div>
    </div>
  );
}