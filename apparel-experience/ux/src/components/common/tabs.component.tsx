import react from 'react'
import ux from 'utils/ux.utils'

import './tabs.component.css'

type TabsProps = {
  items: {
    label: string
    target: string
  }[]
}

export const Tabs = ({ items }: TabsProps) => {
  const [selected, setSelected] = react.useState(0);

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
    const onScroll = () => {
      const y = window.scrollY + 48; // +48 below tabs & border

      for (const i in items) {
        const { target } = items[i];
        const node = document.querySelector('#' + target) as HTMLDivElement;
        if (!node) continue;

        const min = node.offsetTop;
        const max = min + node.clientHeight;
        if (y > min && y < max) {
          setSelected(+i);
          break;
        }
      }
    }

    window.addEventListener('scroll', onScroll, false);
  }, [items]);

  // keep tabs sticky to top
  react.useEffect(() => {
    let sticky = false;
    let lastTop = 0;
    let ticking = false;

    const onScroll = () => {
      lastTop = window.scrollY;
      requestTick();
    }

    const requestTick = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    const update = () => {
      ticking = false;
      const tabs = document.querySelector('.Tabs') as HTMLDivElement;

      if (!sticky && lastTop > tabs.offsetTop) {
        sticky = true;
      } else if (sticky && lastTop < tabs.offsetTop) {
        sticky = false;
        ux.setTranslateY(tabs, 0);
      } else if (sticky) {
        const offset = lastTop - tabs.offsetTop - 2; // -2 for border
        ux.setTranslateY(tabs, offset);
      }
    }

    window.addEventListener('scroll', onScroll, false);
  }, []);

  // drag tab container into view horizontally
  let firstClientX = react.useRef(0);
  let firstDrag = react.useRef(false);
  let dragging = react.useRef(false);

  const onDragStart = () => {
    firstDrag.current = true;
    dragging.current = false;
  }

  const onDragEnd = (tab: any) => {
    if (!dragging.current) {
      const targetId = tab.id.substring(0, tab.id.lastIndexOf('_tab'));
      const index = items.findIndex(({ target }) => target === targetId);
      setSelected(index);

      const target = document.querySelector('#' + targetId) as HTMLDivElement;
      window.scrollTo({
        top: target.offsetTop - 46, // -46 places below tabs
        left: 0,
        behavior: 'smooth'
      });

      const tabs = document.querySelector('.Tabs') as HTMLDivElement;
      ux.setTranslateY(tabs, window.scrollY - tabs.offsetTop - 2); // -2 for border
    }

    firstDrag.current = false;
    dragging.current = false;
  }

  const onDragMove = (container: any, clientX: number) => {
    if (firstDrag.current) {
      firstDrag.current = false;
      dragging.current = true;
      firstClientX.current = clientX - ux.getTranslateX(container);
    } else if (dragging.current) {
      const diff = clientX - firstClientX.current;
      const overage = container.parentElement.clientWidth - container.clientWidth;
      const offset = Math.max(Math.min(0, diff), overage);
      ux.setTranslateX(container, offset);
    }
  }

  return (
    <div className='Tabs'>
      <div
        className='TabsContainer'
        onTouchStart={() => onDragStart()}
        onTouchEnd={(e) => onDragEnd(e.target)}
        onMouseDown={() => onDragStart()}
        onMouseUp={(e) => onDragEnd(e.target)}
        onTouchMove={({
          currentTarget: container,
          targetTouches: hits
        }) => onDragMove(container, hits[0].clientX)}
        onMouseMove={({
          currentTarget: container,
          clientX
        }) => onDragMove(container, clientX)}
      >
        {items.map(({ label, target }, i) => (
          <div
            key={i} 
            id={target + '_tab'}
            className={`Tab ${i === selected && 'selected'}`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
