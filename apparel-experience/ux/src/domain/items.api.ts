import api from 'utils/api.utils'
import { ExperienceParams } from 'utils/dirx2.utils'
import { Event } from './items.domain'

export const useItemAggregateByTapwowId = (id: string) => api.useFetch(`{{server}}/items/tapwow/${id}`)

export const recordItemObservation = async (id: string, params: ExperienceParams) => {
  const {
    tapwowId, deviceId,
    timestamp, location
  } = params;

  if (!tapwowId || !deviceId || !timestamp || !location) {
    console.error('observation not recorded: missing dirx2 experience parameters');
    return;
  } else if (!id) {
    console.error('observation not recorded: item not loaded');
    return;
  }

  const { lat, lon, label } = location;
  const observation: Event = {
    eventTime: new Date(+timestamp).toISOString(),
    readPoint: 'Tapwow',
    businessLocation: label,
    geoLocation: {
      latitude: lat,
      longitude: lon
    },
    businessTransactions: {
      'tapwow:tapwowId': tapwowId,
      'tapwow:deviceId': deviceId
    }
  }

  await api.post(`{{server}}/items/observe/${id}`, observation);
}

const items = {
  useItemAggregateByTapwowId,
  recordItemObservation
}

export default items;
