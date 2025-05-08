import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d{2}\.\d{3}-\d{3}$/, {
    message: 'CEP deve estar no formato 99.999-999',
  })
  postalCode: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  addressNumber?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  addressComplement?: string;
}
