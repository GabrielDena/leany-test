import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';

@ApiTags('Authentication') // Group endpoints under the "Authentication" tag in Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' }) // Brief description of the endpoint
  @ApiBody({
    type: SignInDto,
    description: 'User credentials for login',
    examples: {
      example1: {
        summary: 'Valid credentials',
        value: {
          email: 'user@example.com',
          password: 'StrongPassword123!',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async signIn(@Body() signInDto: SignInDto) {
    const { email, password } = signInDto;
    return await this.authService.signIn(email, password);
  }
}
