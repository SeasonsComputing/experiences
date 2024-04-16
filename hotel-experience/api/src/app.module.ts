import { Module } from '@nestjs/common';
import { FacilityController } from './facility.controller';
import { DoNotDisturbController } from './dnd.controller';
import { ChecklistController } from './checklist.controller';
import { ActivityController } from './activity.controller';
import { AppService } from './app.service';

@Module({
  controllers: [
    FacilityController, 
    DoNotDisturbController, 
    ChecklistController,
    ActivityController
  ],
  providers: [AppService]
})
export class AppModule {}
