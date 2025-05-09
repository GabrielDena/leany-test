import { Module } from '@nestjs/common';
import { CepService } from './cep.service';
import { PokeapiService } from './pokeapi.service';

@Module({
  providers: [CepService, PokeapiService],
  exports: [CepService, PokeapiService],
})
export class ExternalModule {}
