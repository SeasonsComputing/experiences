import { Controller, Get } from '@nestjs/common';
import { HotelService } from '../hotel.service';
import { Facility } from '../hotel.domain';

@Controller('facility')
export class FacilityController {
  constructor(private hotel: HotelService) {}

  @Get()
  async get(): Promise<Facility> {
    return await this.hotel.getFacility();
  }
}
