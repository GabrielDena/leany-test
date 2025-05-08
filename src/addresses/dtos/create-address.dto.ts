import { User } from 'src/users/entities/user.entity';

export class CreateAddressDto {
  user: User;
  street: string;
  number?: number;
  complement?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}
