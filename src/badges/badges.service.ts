import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { BadgesRepository } from './badges.repository';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';

@Injectable()
export class BadgesService {
  constructor(
    private readonly badgesRepository: BadgesRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(createBadgeDto: CreateBadgeDto) {
    return await this.badgesRepository.createBadge(createBadgeDto);
  }

  async findAll() {
    return await this.badgesRepository.findAllBadges();
  }

  async findOne(id: string, withUser?: boolean) {
    const badge = await this.badgesRepository.findOneBy(id, withUser);
    if (!badge) {
      throw new NotFoundException('Badge not found');
    }
    return badge;
  }

  async update(id: string, updateBadgeDto: UpdateBadgeDto) {
    const badge = await this.badgesRepository.findOneBy(id, true);
    if (!badge) {
      throw new NotFoundException('Badge not found');
    }
    if (badge.users?.length > 0) {
      throw new BadRequestException('Badge already given to users');
    }
    return await this.badgesRepository.updateBadge({ ...badge, ...updateBadgeDto });
  }

  async remove(id: string) {
    const badge = await this.badgesRepository.findOneBy(id);
    if (!badge) {
      throw new NotFoundException('Badge not found');
    }
    await this.badgesRepository.deleteBadge(badge);
    return;
  }

  async giveBadgeToUsers(badgeId: string, usersIds: string[]) {
    const badge = await this.badgesRepository.findOneBy(badgeId, true);
    if (!badge) {
      throw new NotFoundException('Badge not found');
    }
    if (!badge.users) {
      badge.users = [];
    }
    for (const userId of usersIds) {
      try {
        const user = await this.usersService.findOne(userId);
        badge.users.push(user);
      } catch {
        console.error(`User with ID ${userId} not found`);
      }
    }
    await this.badgesRepository.updateBadge(badge);
    return this.badgesRepository.findOneBy(badge.id, true);
  }
}
