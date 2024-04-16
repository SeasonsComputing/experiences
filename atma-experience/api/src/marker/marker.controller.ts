import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Marker } from './marker.domain';
import { MarkerService } from './marker.service';

@Controller('marker')
@ApiTags('Marker')
export class MarkerController {
  constructor(private readonly marker: MarkerService) { }

  @Get(':id')
  async findMarkerById(
    @Param('id') id: string
  ): Promise<Marker> {
    return await this.marker.findMarkerById(id);
  }

  @Get('query/items')
  async findMarkerAllItems(): Promise<Marker[]> {
    return await this.marker.findMarkerAllItems();
  }

  @Get('query/products')
  async findMarkerAllProducts(): Promise<Marker[]> {
    return await this.marker.findMarkerAllProducts();
  }
}