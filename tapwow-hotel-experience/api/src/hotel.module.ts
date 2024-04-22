import { Module } from '@nestjs/common';
import { FacilityController } from './controllers/facility.controller';
import { DoNotDisturbController } from './controllers/dnd.controller';
import { ChecklistController } from './controllers/checklist.controller';
import { ActivityController } from './controllers/activity.controller';
import { HotelService } from './hotel.service';

@Module({
  controllers: [
    FacilityController, 
    DoNotDisturbController, 
    ChecklistController,
    ActivityController
  ],
  providers: [HotelService]
})
export class HotelModule {}
