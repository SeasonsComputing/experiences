import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Controller,
  Get, Param, Post, Body,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Item, Care, Event, Marker } from './items.domain';
import { EventDto } from './items.dto';

type ItemAggregate = {
  item: Item;
  care: Care;
  trace: Event[];
};

@Controller('items')
@ApiTags('Items')
export class ItemsController {
  constructor(
    @InjectModel('Item') private itemModel: Model<Item>,
    @InjectModel('Care') private careModel: Model<Care>,
    @InjectModel('Event') private eventModel: Model<Event>,
    @InjectModel('Marker') private markerModel: Model<Marker>
  ) { }

  @Get(':itemId')
  async getItemByItemId(
    @Param('itemId') itemId: string
  ): Promise<Item> {
    const item = await this.itemModel.findOne({ itemId });
    if (!item) throw new NotFoundException();
    return item;
  }

  @Get('care/:documentId')
  async getCareByDocumentId(
    @Param('documentId') documentId: string
  ): Promise<Care> {
    const care = await this.careModel.findOne({ documentId });
    if (!care) throw new NotFoundException();
    return care;
  }

  @Get('trace/:itemId')
  async getEventsByItemId(
    @Param('itemId') itemId: string
  ): Promise<Event[]> {
    return await this.eventModel.find({ itemId }).sort({ eventTime: -1 });
  }

  @Get('aggregate/:itemId')
  async getAggregateByItemId(
    @Param('itemId') itemId: string
  ): Promise<ItemAggregate> {
    const item = await this.getItemByItemId(itemId);
    const care = await this.getCareByDocumentId(item.careId);
    const trace = await this.getEventsByItemId(itemId);
    return { item, care, trace };
  }

  @Get('tapwow/:tapwowId')
  async getAggregateByTapwowId(
    @Param('tapwowId') tapwowId: string
  ): Promise<ItemAggregate> {
    const marker = await this.markerModel.findOne({ tapwowId });
    if (!marker) throw new NotFoundException();
    return await this.getAggregateByItemId(marker.itemId);
  }

  @Post('observe/:itemId')
  async postEventByItemId(
    @Param('itemId') itemId: string,
    @Body() dto: EventDto
  ) {
    const exists = await this.itemModel.find({ itemId });
    if (exists.length === 0) throw new NotFoundException();
    const event = new this.eventModel({ itemId, ...dto });
    await event.save();
  }
}
