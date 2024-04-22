import { Controller, Get, Put, Query, Body } from '@nestjs/common';
import { HotelService } from '../hotel.service';
import { Activity } from '../hotel.domain';

@Controller('activity')
export class ActivityController {
  constructor(private hotel: HotelService) {}

  @Get()
  async get(@Query() query: ParameterDecorator): Promise<Activity[]> {
    return await this.hotel.getActivityByQuery({ ...query });
  }

  @Put()
  async set(@Body() a: Activity) {
    await this.hotel.addActivity(a);
  }
}
