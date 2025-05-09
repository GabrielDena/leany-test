import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonsRepository } from './pokemons.repository';
import { PayloadInterface } from 'src/auth/types/payload.interface';
import { SearchPokemonsDto } from './dto/search-pokemons.dto';
import { PokeapiService } from 'src/external/pokeapi.service';

@Injectable()
export class PokemonsService {
  constructor(
    private readonly pokemonsRepository: PokemonsRepository,
    private readonly usersService: UsersService,
    private readonly pokeapiService: PokeapiService,
  ) {}

  async create(createPokemonDto: CreatePokemonDto, userReq: PayloadInterface) {
    const user = await this.usersService.findOne(createPokemonDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!userReq.isAdmin && userReq.id !== createPokemonDto.userId) {
      throw new ForbiddenException('Can only create Pokémon for yourself');
    }
    return await this.pokemonsRepository.createPokemon({ ...createPokemonDto, user });
  }

  async findAll() {
    return await this.pokemonsRepository.findAllPokemons();
  }

  async findOne(id: string) {
    const pokemon = await this.pokemonsRepository.findPokemonById(id);
    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }
    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto, userId: string) {
    const pokemonToUpdate = await this.pokemonsRepository.findPokemonById(id);
    if (!pokemonToUpdate) {
      throw new NotFoundException('Pokemon not found');
    }
    if (pokemonToUpdate.user.id !== userId) {
      throw new ForbiddenException('Only the owner can update this Pokémon');
    }
    if (updatePokemonDto.userId) {
      const user = await this.usersService.findOne(updatePokemonDto.userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      pokemonToUpdate.user = user;
    }
    const updatedPokemon = await this.pokemonsRepository.updatePokemon({
      ...pokemonToUpdate,
      ...updatePokemonDto,
    });
    if (!updatedPokemon) {
      throw new NotFoundException('Pokemon not found');
    }
    return updatedPokemon;
  }

  async remove(id: string, userId: string) {
    const pokemon = await this.pokemonsRepository.findPokemonById(id);
    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }
    if (pokemon.user.id !== userId) {
      throw new ForbiddenException('Only the owner can delete this Pokémon');
    }
    await this.pokemonsRepository.deletePokemon(id);
    return;
  }

  async searchPokemons(searchPokemonsDto: SearchPokemonsDto) {
    const { page = 1, limit = 20, species, type } = searchPokemonsDto;

    if (species && type) {
      throw new BadRequestException('You can only filter by either species or type, not both.');
    }

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Call the PokeapiService to fetch Pokémon data
    const pokemons = await this.pokeapiService.getPokemons(limit, offset, { species, type });

    return pokemons;
  }
}
