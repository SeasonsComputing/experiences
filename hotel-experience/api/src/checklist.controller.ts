import { Controller, Get, Param, HttpStatus, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { Checklist } from './facility.domain';

@Controller('checklist')
export class ChecklistController {
  constructor(private appService: AppService) {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<Checklist> {
    const list = await this.appService.getChecklistById(id);
    if (list === undefined) {
      throw new HttpException('Checklist not found', HttpStatus.NOT_FOUND);
    }
    return list;
  }
}
