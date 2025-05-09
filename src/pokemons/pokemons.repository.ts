import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonsRepository {
  constructor(
    @InjectRepository(Pokemon)
    private readonly repository: Repository<Pokemon>,
  ) {}

  async createPokemon(pokemonData: CreatePokemonDto & { user: User }): Promise<Pokemon> {
    const pokemon = this.repository.create(pokemonData);
    return await this.repository.save(pokemon);
  }

  async updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    await this.repository.save(pokemon);
    return (await this.repository.findOne({ where: { id: pokemon.id } })) as Pokemon;
  }

  async findPokemonById(id: string): Promise<Pokemon | null> {
    return await this.repository.findOne({
      relations: {
        user: {
          pokemons: false,
          address: false,
          badges: false,
        },
      },
      where: { id },
    });
  }

  async findAllPokemons(): Promise<Pokemon[]> {
    return await this.repository.find({
      relations: {
        user: {
          pokemons: false,
          address: false,
          badges: false,
        },
      },
      order: { name: 'ASC' },
    });
  }

  async findAllPokemonsOfUser(userId: string): Promise<Pokemon[]> {
    return await this.repository.find({
      where: { user: { id: userId } },
      relations: {
        user: true,
      },
      order: { name: 'ASC' },
    });
  }

  async deletePokemon(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
