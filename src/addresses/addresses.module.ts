import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalModule } from 'src/external/external.module';
import { User } from 'src/users/entities/user.entity';
import { AddressesService } from './addresses.service';
import { AddressesRepository } from './adresses.repository';
import { Address } from './entities/address.entity';

@Module({
  providers: [AddressesService, AddressesRepository],
  exports: [AddressesService],
  imports: [ExternalModule, TypeOrmModule.forFeature([Address, User])],
})
export class AddressesModule {}
