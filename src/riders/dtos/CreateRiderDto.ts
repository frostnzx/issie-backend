import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateRiderDto {
  @ApiProperty({ description: "Rider's first name", example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: "Rider's last name", example: 'Pork' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: "Rider's email", example: 'johnpork@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "Rider's license plate", example: '5กข2662' })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({ description: "Rider's phone number", example: '087-1234567' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  // must have position too innit?
  @ApiPropertyOptional({
    description: "Rider's position latitude (optional)",
    example: '69.69',
  })
  @IsNumber()
  @IsOptional()
  latitude: number;

  @ApiPropertyOptional({
    description: "Rider's position longitude (optional)",
    example: '69.69',
  })
  @IsNumber()
  @IsOptional()
  longitude: number;
}
