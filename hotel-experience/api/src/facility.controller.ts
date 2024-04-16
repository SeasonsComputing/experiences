import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Facility } from './facility.domain';

@Controller('facility')
export class FacilityController {
  constructor(private appService: AppService) {}

  @Get()
  async get(): Promise<Facility> {
    return await this.appService.getFacility();
  }
}
