import { Controller, Get, Param, HttpStatus, HttpException } from '@nestjs/common';
import { HotelService } from '../hotel.service';
import { Checklist } from '../hotel.domain';

@Controller('checklist')
export class ChecklistController {
  constructor(private hotel: HotelService) {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<Checklist> {
    const list = await this.hotel.getChecklistById(id);
    if (list === undefined) {
      throw new HttpException('Checklist not found', HttpStatus.NOT_FOUND);
    }
    return list;
  }
}
