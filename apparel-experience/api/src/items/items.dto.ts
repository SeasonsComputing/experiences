import { IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class GeoDto {
  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;
}

export class EventDto {
  @ApiProperty()
  eventId: string;

  @IsISO8601({ strict: true })
  @ApiProperty()
  eventTime: string;

  @ApiProperty()
  readPoint: string;

  @ApiProperty()
  businessLocation: string;

  @ApiProperty()
  geoLocation: GeoDto;

  @ApiProperty()
  businessTransactions: { [key: string]: string };
}
