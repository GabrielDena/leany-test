import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PokemonsController } from './pokemons.controller';
import { PokemonsRepository } from './pokemons.repository';
import { PokemonsService } from './pokemons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { ExternalModule } from 'src/external/external.module';

@Module({
  controllers: [PokemonsController],
  providers: [PokemonsService, PokemonsRepository],
  imports: [ExternalModule, UsersModule, TypeOrmModule.forFeature([Pokemon])],
})
export class PokemonsModule {}
