import { Controller, Get, Put, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Space } from './facility.domain';

class DoNotDisturbDto {
  readonly spaceId: string;
  readonly dnd: boolean;
};

@Controller('dnd')
export class DoNotDisturbController {
  constructor(private appService: AppService) {}

  @Get(':spaceId')
  async get(@Param('spaceId') id: string): Promise<boolean> {
    const space: Space = await this.appService.getSpaceById(id);
    if (space === undefined) {
      throw new HttpException(`space ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return space.dnd;
  }

  @Put()
  async set(@Body() dto: DoNotDisturbDto) {
    const { spaceId, dnd } = dto;
    const ok: boolean = await this.appService.setDoNotDisturb(spaceId, dnd);
    if (!ok) {
      throw new HttpException(`space ${spaceId} not found`, HttpStatus.NOT_FOUND);
    }
  }
}
