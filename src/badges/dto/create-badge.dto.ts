import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBadgeDto {
  @ApiProperty({
    description: 'The name of the badge',
    example: 'Champion Badge',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the badge',
    example: 'Awarded for exceptional performance in battles.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
