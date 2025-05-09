import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { SearchPokemonsDto } from './dto/search-pokemons.dto';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request.interface';

@ApiTags('Pokémons')
@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Pokémon' })
  @ApiBody({
    type: CreatePokemonDto,
    description: 'Data required to create a Pokémon',
  })
  @ApiResponse({
    status: 201,
    description: 'Pokémon created successfully.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Antonio',
        species: 'Pikachu',
        createdAt: '2025-05-08T14:20:38.000Z',
        updatedAt: '2025-05-08T14:20:38.000Z',
      },
    },
  })
  create(@Body() createPokemonDto: CreatePokemonDto, @Req() req: AuthenticatedRequest) {
    return this.pokemonsService.create(createPokemonDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'List all Pokémon' })
  @ApiResponse({
    status: 200,
    description: 'List of Pokémon retrieved successfully.',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Antonio',
          species: 'Pikachu',
          user: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            email: 'user@example.com',
          },
          createdAt: '2025-05-08T14:20:38.000Z',
          updatedAt: '2025-05-08T14:20:38.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.pokemonsService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search Pokémon with filters and pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'The page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'The number of items per page',
    example: 20,
  })
  @ApiQuery({
    name: 'species',
    required: false,
    description:
      'Filter by Pokémon species. **Note:** You can only specify either `species` or `type`, not both.',
    example: 'pikachu',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description:
      'Filter by Pokémon type. **Note:** You can only specify either `type` or `species`, not both.',
    example: 'electric',
  })
  @ApiResponse({
    status: 200,
    description: 'List of Pokémon retrieved successfully.',
    schema: {
      example: [
        {
          name: 'pikachu',
          url: 'https://pokeapi.co/api/v2/pokemon/25/',
        },
        {
          name: 'raichu',
          url: 'https://pokeapi.co/api/v2/pokemon/26/',
        },
      ],
    },
  })
  async search(@Query() searchPokemonsDto: SearchPokemonsDto) {
    return this.pokemonsService.searchPokemons(searchPokemonsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Pokémon by ID' })
  @ApiParam({ name: 'id', description: 'ID of the Pokémon', type: String })
  @ApiResponse({
    status: 200,
    description: 'Pokémon retrieved successfully.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Antonio',
        species: 'Pikachu',
        createdAt: '2025-05-08T14:20:38.000Z',
        updatedAt: '2025-05-08T14:20:38.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Pokémon not found.' })
  findOne(@Param('id') id: string) {
    return this.pokemonsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Pokémon by ID' })
  @ApiParam({ name: 'id', description: 'ID of the Pokémon', type: String })
  @ApiBody({
    type: UpdatePokemonDto,
    description: 'Data to update the Pokémon',
    examples: {
      example1: {
        summary: 'Valid update data',
        value: {
          species: 'Raichu',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Pokémon updated successfully.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Antonio',
        species: 'Raichu',
        createdAt: '2025-05-08T14:20:38.000Z',
        updatedAt: '2025-05-08T14:25:38.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Pokémon not found.' })
  update(
    @Param('id') id: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.pokemonsService.update(id, updatePokemonDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Pokémon by ID' })
  @ApiParam({ name: 'id', description: 'ID of the Pokémon', type: String })
  @ApiResponse({
    status: 200,
    description: 'Pokémon deleted successfully.',
    schema: {
      example: {
        message: 'Pokémon successfully deleted.',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Pokémon not found.' })
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.pokemonsService.remove(id, req.user.id);
  }
}
