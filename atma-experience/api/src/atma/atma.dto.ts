
import { IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from './atma.domain';

class GeoDto {
  @ApiProperty()
  latitude: number

  @ApiProperty()
  longitude: number
}

export class EventDto implements Event {
  @IsISO8601({ strict: true })
  @ApiProperty()
  eventTime: string

  @ApiProperty()
  readPoint: string

  @ApiProperty()
  businessLocation: string

  @ApiProperty()
  geoLocation: GeoDto

  @ApiProperty()
  businessTransactions: { [k: string]: any }
}