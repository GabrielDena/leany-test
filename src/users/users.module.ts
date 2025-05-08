import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesModule } from 'src/addresses/addresses.module';
import { User } from './entities/user.entity';
import { UsersRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  imports: [AddressesModule, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
