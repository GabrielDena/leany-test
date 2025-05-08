import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddressInformationDto } from './dtos/address-information.dto';

@Injectable()
export class ExternalService {
  async getCepInformation(cep: string) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new InternalServerErrorException('Failed to fetch data from external API');
    }
    const jsonResponse = (await response.json()) as AddressInformationDto;

    return {
      address: jsonResponse.logradouro,
      city: jsonResponse.localidade,
      state: jsonResponse.uf,
      country: 'Brazil',
    };
  }
}
