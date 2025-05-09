import { Module } from '@nestjs/common';
import { BadgesController } from './badges.controller';
import { BadgesRepository } from './badges.repository';
import { BadgesService } from './badges.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from './entities/badge.entity';

@Module({
  controllers: [BadgesController],
  providers: [BadgesService, BadgesRepository],
  imports: [UsersModule, TypeOrmModule.forFeature([Badge])],
})
export class BadgesModule {}
