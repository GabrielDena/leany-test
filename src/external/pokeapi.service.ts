/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PokemonSpecies } from './interfaces/pokemon.interface';

@Injectable()
export class PokeapiService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';
  async getPokemons(
    limit = 20,
    offset = 0,
    filters?: { species?: string; type?: string },
  ): Promise<({ name: string; url: string } | PokemonSpecies)[]> {
    try {
      let url = `${this.baseUrl}/`;

      if (filters?.species) {
        url = url + `pokemon-species/${filters.species}`;
      }
      if (filters?.type) {
        url = url + `type/${filters.type}`;
      }
      if (!filters?.species && !filters?.type) {
        url = url + 'pokemon-species';
      }

      url = url + `?limit=${limit}&offset=${offset}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new InternalServerErrorException('Failed to fetch data from PokeAPI');
      }

      const data = await response.json();

      if (filters?.type) return data.map((d) => d.pokemon);

      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
