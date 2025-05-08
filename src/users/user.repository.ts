import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
      relations: ['badges', 'pokemons'],
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async updateUser(id: string, user: User): Promise<User> {
    await this.repository.update(id, user);
    return (await this.findUserById(id)) as User;
  }

  async fildAllUsers(): Promise<User[]> {
    return await this.repository.find({
      relations: ['badges', 'pokemons'],
      order: {
        firstName: 'ASC',
        lastName: 'ASC',
      },
    });
  }

  async setAdmin(id: string, user: User): Promise<User> {
    await this.updateUser(id, user);
    return (await this.findUserById(id)) as User;
  }

  async deleteUser(id: string): Promise<void> {
    await this.repository.delete(id);
    return;
  }
}
