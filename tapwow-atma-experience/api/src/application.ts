import { Module } from '@nestjs/common';
import { MarkerService } from './marker/marker.service';
import { MarkerController } from './marker/marker.controller';
import { AtmaService } from './atma/atma.service';
import { ProductController, ItemController } from './atma/atma.controller';

@Module({
  imports: [],
  controllers: [MarkerController, ProductController, ItemController],
  providers: [MarkerService, AtmaService],
})
export class Application {}