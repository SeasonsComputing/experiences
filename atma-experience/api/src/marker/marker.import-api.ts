import { NotFoundException } from '@nestjs/common';
import { Marker, Type } from './marker.domain'

import * as db from './marker.db.json'

export const fetchMarkerData = async (
  id: string
): Promise<Marker> => {
  const find = db.markers.find(m => m.id === id);
  if (!find) throw new NotFoundException();
  return find as Marker;
}

export const fetchMarkerQueryData = async (
  type: Type
): Promise<Marker[]> => {
  return db.markers.filter(m => m.to.is === type) as Marker[];
}

const api = {
  fetchMarkerData,
  fetchMarkerQueryData
};

export default api;