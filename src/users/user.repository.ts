import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
      relations: {
        address: true,
        pokemons: true,
        badges: true,
      },
    });
  }

  async findUserByIdToUpdate(id: string): Promise<User | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        isAdmin: true,
      },
    });
  }

  async updateUser(user: User): Promise<User> {
    await this.repository.save(user);
    return (await this.findUserById(user.id)) as User;
  }

  async fildAllUsers(): Promise<User[]> {
    return await this.repository.find({
      relations: {
        address: true,
        pokemons: true,
        badges: true,
      },
      order: {
        firstName: 'ASC',
        lastName: 'ASC',
      },
    });
  }

  async deleteUser(id: string): Promise<void> {
    await this.repository.softDelete(id);
    return;
  }
}
