import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { Badge } from './entities/badge.entity';

@Injectable()
export class BadgesRepository {
  constructor(
    @InjectRepository(Badge)
    private readonly repository: Repository<Badge>,
  ) {}

  async createBadge(createBadgeDto: CreateBadgeDto): Promise<Badge> {
    const badge = this.repository.create(createBadgeDto);
    return await this.repository.save(badge);
  }

  async updateBadge(badge: Badge): Promise<Badge> {
    await this.repository.save(badge);
    return (await this.findOneBy(badge.id)) as Badge;
  }

  async findOneBy(id: string, withUsers?: boolean): Promise<Badge | null> {
    const query: FindOneOptions<Badge> = {
      where: { id },
    };
    if (withUsers) {
      query.relations = {
        users: {
          pokemons: false,
          address: false,
        },
      };
    }
    return await this.repository.findOne(query);
  }

  async findAllBadges(): Promise<Badge[]> {
    return await this.repository.find({
      relations: {
        users: {
          pokemons: false,
          address: false,
        },
      },
    });
  }

  async deleteBadge(badge: Badge): Promise<void> {
    await this.repository.softDelete({ id: badge.id });
    return;
  }
}
