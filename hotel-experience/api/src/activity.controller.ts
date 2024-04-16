import { Controller, Get, Put, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Activity } from './facility.domain';

@Controller('activity')
export class ActivityController {
  constructor(private appService: AppService) {}

  @Get()
  get(@Query() query: ParameterDecorator) {
    return this.appService.getActivityByQuery({ ...query });
  }

  @Put()
  set(@Body() a: Activity) {
    this.appService.addActivity(a);
  }
}
