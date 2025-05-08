import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Admin } from 'src/auth/decorators/admin.decorator';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({ type: CreateUserDto, description: 'Dados necessários para criar um usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123456789',
        address: '123 Main St',
        addressNumber: 123,
        addressComplement: 'Apt 4B',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brazil',
        postalCode: '12.345-678',
        isAdmin: false,
        badges: [],
        pokemons: [],
        createdAt: '2025-05-08T14:20:38.000Z',
        updatedAt: '2025-05-08T14:20:38.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Admin()
  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso.',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'user1@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '123456789',
          address: '123 Main St',
          addressNumber: 123,
          addressComplement: 'Apt 4B',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brazil',
          postalCode: '12.345-678',
          isAdmin: false,
          badges: [{ id: 'badge1', name: 'Badge 1', description: 'First badge' }],
          pokemons: [{ id: 'pokemon1', name: 'Antonio', species: 'pikachu' }],
          createdAt: '2025-05-08T14:20:38.000Z',
          updatedAt: '2025-05-08T14:20:38.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: String })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123456789',
        address: '123 Main St',
        addressNumber: 123,
        addressComplement: 'Apt 4B',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brazil',
        postalCode: '12.345-678',
        isAdmin: false,
        badges: [{ id: 'badge1', name: 'Badge 1', description: 'First badge' }],
        pokemons: [{ id: 'pokemon1', name: 'Antonio', species: 'pikachu' }],
        createdAt: '2025-05-08T14:20:38.000Z',
        updatedAt: '2025-05-08T14:20:38.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: String })
  @ApiBody({ type: UpdateUserDto, description: 'Dados para atualizar o usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'updateduser@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123456789',
        address: '123 Main St',
        addressNumber: 123,
        addressComplement: 'Apt 4B',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brazil',
        postalCode: '12.345-678',
        isAdmin: false,
        badges: [{ id: 'badge1', name: 'Badge 1', description: 'First badge' }],
        pokemons: [{ id: 'pokemon1', name: 'Pikachu', species: 'Electric' }],
        createdAt: '2025-05-08T14:20:38.000Z',
        updatedAt: '2025-05-08T14:20:38.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Admin()
  @Patch(':id/toggle-admin')
  @ApiOperation({ summary: 'Alternar status de administrador de um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: String })
  @ApiResponse({
    status: 200,
    description: 'Status de administrador alternado com sucesso.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'updateduser@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123456789',
        address: '123 Main St',
        addressNumber: 123,
        addressComplement: 'Apt 4B',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brazil',
        postalCode: '12.345-678',
        isAdmin: false,
        badges: [{ id: 'badge1', name: 'Badge 1', description: 'First badge' }],
        pokemons: [{ id: 'pokemon1', name: 'Pikachu', species: 'Electric' }],
        createdAt: '2025-05-08T14:20:38.000Z',
        updatedAt: '2025-05-08T14:20:38.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  toggleAdmin(@Param('id') id: string) {
    return this.usersService.toggleAdmin(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: String })
  @ApiResponse({
    status: 200,
    description: 'Usuário removido com sucesso.',
    schema: {
      example: {
        message: 'User successfully deleted',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
