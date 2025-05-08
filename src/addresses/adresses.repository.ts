import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';

@Injectable()
export class AddressesRepository {
  constructor(
    @InjectRepository(Address)
    private readonly repository: Repository<Address>,
  ) {}

  async createAddress(addressData: CreateAddressDto): Promise<Address> {
    const address = this.repository.create(addressData);
    return await this.repository.save(address);
  }

  async updateAddress(userId: string, addressData: UpdateAddressDto): Promise<Address | null> {
    await this.repository.update(
      {
        user: { id: userId },
      },
      addressData,
    );
    return await this.repository.findOne({ where: { user: { id: userId } } });
  }

  async findAddressById(id: string): Promise<Address | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async deleteAddress(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
