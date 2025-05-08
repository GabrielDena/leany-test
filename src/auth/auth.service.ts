import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOneByEmail(email);

    if (!(await verify(user.password, password))) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
