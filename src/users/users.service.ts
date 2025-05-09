import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AddressesService } from 'src/addresses/addresses.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './user.repository';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly addressService: AddressesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userData = {
      ...createUserDto,
      password: await hash(createUserDto.password),
    };
    const user = await this.repository.createUser(userData);
    await this.addressService.createAddress({
      user,
      postalCode: createUserDto.postalCode,
      number: createUserDto.addressNumber,
      complement: createUserDto.addressComplement,
    });
    return await this.repository.findUserById(user.id);
  }

  async findAll() {
    const users = await this.repository.fildAllUsers();
    return users;
  }

  async findOne(id: string) {
    const user = await this.repository.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.repository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.repository.findUserByIdToUpdate(id);
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.postalCode) {
      await this.addressService.updateAddress(id, {
        postalCode: updateUserDto.postalCode,
        number: updateUserDto.addressNumber,
        complement: updateUserDto.addressComplement,
      });
    }
    if (updateUserDto.email) {
      const existingUser = await this.repository.findUserByEmail(updateUserDto.email);
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('Email already in use');
      }
    }
    const updatedUser = await this.repository.updateUser({
      ...userToUpdate,
      ...updateUserDto,
    });
    if (!updatedUser) {
      throw new InternalServerErrorException('Failed to update user');
    }
    return updatedUser;
  }

  async toggleAdmin(id: string) {
    const userToUpdate = await this.repository.findUserById(id);
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }
    userToUpdate.isAdmin = !userToUpdate.isAdmin;
    const updatedUser = await this.repository.updateUser(userToUpdate);
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
