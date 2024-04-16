import ux from '../../utils/ux.utils'
import {
  MapContainer, Marker,
  TileLayer, Popup, useMap
} from 'react-leaflet'

import './trace-map.component.css'

type GeoCoord = {
  latitude: number
  longitude: number
}

type TraceMapProps = {
  center: GeoCoord
  trace: {
    eventTime: string
    readPoint: string
    businessLocation: string
    geoLocation: GeoCoord
  }[]
}

export function TraceMap({ trace, center }: TraceMapProps) {
  const geo2pos = (geo: GeoCoord): [number, number] => {
    const { latitude, longitude } = geo;
    return [latitude, longitude];
  }

  function RecenterMap({ center }: { center: [number, number] }) {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
  }

  return (
    <MapContainer
      id={'trace-map'}
      className={'TraceMap'}
      center={geo2pos(center)}
      zoom={4} scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap center={geo2pos(center)} />
      {trace.map(({
        eventTime,
        readPoint,
        businessLocation,
        geoLocation
      }, i) => (
        <Marker key={i} position={geo2pos(geoLocation)}>
          <Popup>
            <div className='TraceMapPopup'>
              <h2>{readPoint}</h2>
              <h3>{businessLocation}</h3>
              <h4>{ux.formatDateTime(eventTime)}</h4>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}