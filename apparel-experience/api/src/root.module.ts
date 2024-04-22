import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsController } from './items/items.controller';
import { ItemSchema } from './items/schemas/item.schema';
import { CareSchema } from './items/schemas/care.schema';
import { EventSchema } from './items/schemas/event.schema';
import { MarkerSchema } from './items/schemas/marker.schema';

const { DB_CONNECTION_URI } = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION_URI),
    MongooseModule.forFeature([
      { name: 'Item', schema: ItemSchema },
      { name: 'Care', schema: CareSchema },
      { name: 'Event', schema: EventSchema },
      { name: 'Marker', schema: MarkerSchema },
    ]),
  ],
  controllers: [ItemsController],
})
export class RootModule {}
