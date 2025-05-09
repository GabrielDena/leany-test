import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddressInformationDto } from './dtos/address-information.dto';

@Injectable()
export class CepService {
  async getCepInformation(cep: string) {
    const sanitizedCep = cep.replace(/\D/g, '');
    const response = await fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`);
    if (!response.ok) {
      throw new InternalServerErrorException('Failed to fetch data from external API');
    }
    const jsonResponse = (await response.json()) as AddressInformationDto;

    return {
      street: jsonResponse.logradouro,
      city: jsonResponse.localidade,
      state: jsonResponse.uf,
      country: 'Brazil',
      postalCode: cep,
    };
  }
}
