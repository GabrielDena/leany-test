import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ExternalService } from 'src/external/external.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly externalService: ExternalService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const addressInformation = await this.externalService.getCepInformation(
      createUserDto.postalCode,
    );
    const userData = {
      ...createUserDto,
      ...addressInformation,
    };
    const user = await this.repository.createUser(userData);
    return user;
  }

  async findAll() {
    const users = await this.repository.fildAllUsers();
    if (!users) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
    return users;
  }

  async findOne(id: string) {
    const user = await this.repository.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.repository.findUserById(id);
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.postalCode) {
      const addressInformation = await this.externalService.getCepInformation(
        updateUserDto.postalCode,
      );
      if (!addressInformation) {
        throw new InternalServerErrorException('Failed to fetch address information');
      }
      updateUserDto = {
        ...updateUserDto,
        ...addressInformation,
      };
    }
    if (updateUserDto.email) {
      const existingUser = await this.repository.findUserByEmail(updateUserDto.email);
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('Email already in use');
      }
    }
    const updatedUser = await this.repository.updateUser(id, {
      ...userToUpdate,
      ...updateUserDto,
    });
    if (!updatedUser) {
      throw new InternalServerErrorException('Failed to update user');
    }
    return updatedUser;
  }

  async remove(id: string) {
    const userToDelete = await this.repository.findUserById(id);
    if (!userToDelete) {
      throw new NotFoundException('User not found');
    }
    await this.repository.deleteUser(id);
    return;
  }
}
