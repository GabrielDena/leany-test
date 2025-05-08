import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressesRepository } from './adresses.repository';
import { ExternalService } from 'src/external/external.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AddressesService {
  constructor(
    private readonly externalService: ExternalService,
    private readonly repository: AddressesRepository,
  ) {}

  async createAddress(addressData: {
    user: User;
    postalCode: string;
    number?: number;
    complement?: string;
  }) {
    const addressInformation = await this.externalService.getCepInformation(addressData.postalCode);
    if (!addressInformation) {
      throw new NotFoundException('Failed to fetch address information');
    }
    const address = await this.repository.createAddress({
      ...addressData,
      ...addressInformation,
    });
    return address;
  }

  async updateAddress(
    userId: string,
    addressData: { postalCode: string; number?: number; complement?: string },
  ) {
    const addressInformation = await this.externalService.getCepInformation(addressData.postalCode);
    if (!addressInformation) {
      throw new NotFoundException('Failed to fetch address information');
    }
    addressData = {
      ...addressData,
      ...addressInformation,
    };
    const address = await this.repository.updateAddress(userId, addressData);
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }
}
