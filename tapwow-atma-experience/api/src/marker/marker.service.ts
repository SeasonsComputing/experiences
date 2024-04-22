import { Injectable } from '@nestjs/common';
import { Marker, Type } from './marker.domain'
import api from './marker.api'

@Injectable()
export class MarkerService {
  async findMarkerById(id: string): Promise<Marker> {
    return await api.fetchMarkerData(id) as Marker;
  }

  async findMarkerAllItems(): Promise<Marker[]> {
    return await api.fetchMarkerQueryData(Type.item) as Marker[];
  }

  async findMarkerAllProducts(): Promise<Marker[]> {
    return await api.fetchMarkerQueryData(Type.product) as Marker[];
  }
}