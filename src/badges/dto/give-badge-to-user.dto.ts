import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GiveBadgeToUsersDto {
  @ApiProperty({
    description: 'Array of user IDs to assign the badge to',
    example: ['123e4567-e89b-12d3-a456-426614174002', '123e4567-e89b-12d3-a456-426614174003'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  usersIds: string[];
}
