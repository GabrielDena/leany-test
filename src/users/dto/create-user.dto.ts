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
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user (must be strong)',
    example: 'StrongPassword123!',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({
    description: 'The phone number of the user',
    example: '123456789',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description: 'The postal code of the user (must follow the format 99.999-999)',
    example: '12.345-678',
  })
  @IsString()
  @Matches(/^\d{2}\.\d{3}-\d{3}$/, {
    message: 'CEP deve estar no formato 99.999-999',
  })
  postalCode: string;

  @ApiPropertyOptional({
    description: 'The address number of the user',
    example: 123,
  })
  @IsNumber()
  @IsOptional()
  addressNumber?: number;

  @ApiPropertyOptional({
    description: 'The address complement of the user',
    example: 'Apt 4B',
  })
  @IsString()
  @IsOptional()
  addressComplement?: string;
}
