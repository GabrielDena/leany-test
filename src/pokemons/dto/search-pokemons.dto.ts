import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchPokemonsDto {
  @ApiPropertyOptional({
    description: 'The page number for pagination',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    description: 'The number of items per page',
    example: 20,
  })
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Filter by Pokémon species',
    example: 'pikachu',
  })
  @IsString()
  @IsOptional()
  species?: string;

  @ApiPropertyOptional({
    description: 'Filter by Pokémon type',
    example: 'electric',
  })
  @IsString()
  @IsOptional()
  type?: string;
}
