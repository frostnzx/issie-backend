import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateRiderDto {
  @ApiProperty({ description: "Rider's first name", example: 'John' })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ description: "Rider's last name", example: 'Pork' })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ description: "Rider's email", example: 'johnpork@gmail.com' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ description: "Rider's license plate", example: '5กข2662' })
  @IsString()
  @IsOptional()
  licensePlate: string;

  @ApiProperty({ description: "Rider's phone number", example: '087-1234567' })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string;
}
