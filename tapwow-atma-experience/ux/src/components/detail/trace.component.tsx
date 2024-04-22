import { Section, Subsection } from '../shared/section.component'

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
  onExploreMap: (props: GeoProps) => void
}

export function Trace({ trace, onExploreMap }: TraceProps) {
  function formatDateTime(when: string) {
    return new Date(Date.parse(when)).toLocaleString();
  }

  return (
    <Section id={'trace'}>
      <Subsection>
        {
          trace.map(({
            eventTime,
            readPoint,
            businessLocation,
            geoLocation
          }, i) => (
            <div key={i} className='Trace'>
              <div className='SubsectionHeading'>
                <h2>{readPoint}</h2>
              </div>
              <div className='SubsectionContent'>
                <ul>
                  {businessLocation && geoLocation &&
                    <li>
                      <h3>Where</h3>
                      <div className='TraceLocation rightJustify'>
                        <button
                          onClick={() => onExploreMap(geoLocation)}
                          title='Explore on map'
                        >
                          <img
                            src={LocationIcon}
                            height='22'
                            alt='Explore on the map'
                          />
                        </button>
                        <span>{businessLocation}</span>
                      </div>
                    </li>
                  }
                  <li>
                    <h3>When</h3>
                    <p>{formatDateTime(eventTime)}</p>
                  </li>
                </ul>
              </div>
            </div>
          ))
        }
      </Subsection>
    </Section>
  );
}