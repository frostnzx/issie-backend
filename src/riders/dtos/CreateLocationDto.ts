import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: "Rider's location Latitude", example: '69.69' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ description: "Rider's location Longitude", example: '69.69' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
