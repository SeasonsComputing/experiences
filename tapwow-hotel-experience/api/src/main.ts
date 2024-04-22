import { NestFactory } from '@nestjs/core';
import { HotelModule } from './hotel.module';

async function bootstrap() {
  const app = await NestFactory.create(HotelModule, { cors : true });
  await app.listen(3001);
}
bootstrap();
