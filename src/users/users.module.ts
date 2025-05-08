import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './user.repository';
import { ExternalModule } from 'src/external/external.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  imports: [ExternalModule, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
