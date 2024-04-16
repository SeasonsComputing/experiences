import ux from '../../utils/ux.utils'
import { Section, Subsection } from '../common/section.component'

import LocationIcon from '../../assets/ic_map.png'

import './trace.component.css'

type GeoProps = {
  latitude: number
  longitude: number
}

type TraceProps = {
  trace: {
    eventTime: string
    readPoint: string
    businessLocation: string
    geoLocation: GeoProps
  }[]
  onExploreMap: (geo: GeoProps) => void
}

export function Trace({ trace, onExploreMap }: TraceProps) {
  return (
    <Section id={'trace'}>
      <Subsection>
        {trace.map(({
          eventTime,
          readPoint,
          businessLocation,
          geoLocation: geo
        }, i) => (
          <div key={i} className='Trace'>
            <div className='SubsectionHeading'>
              <h2>{readPoint}</h2>
            </div>
            <div className='SubsectionContent'>
              <ul>
                <li>
                  <h3>Where</h3>
                  <div className='TraceLocation rightJustify'>
                    <button onClick={() => onExploreMap(geo)} title='Explore on map'>
                      <img src={LocationIcon} height='22' alt='Explore on map' />
                    </button>
                    <span>{businessLocation || `(See map)`}</span>
                  </div>
                </li>
                <li>
                  <h3>When</h3>
                  <p>{ux.formatDateTime(eventTime)}</p>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </Subsection>
    </Section>
  );
}