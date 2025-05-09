import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/auth/decorators/admin.decorator';
import { BadgesService } from './badges.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { GiveBadgeToUsersDto } from './dto/give-badge-to-user.dto';

@ApiTags('Badges')
@Admin()
@Controller('badges')
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new badge' })
  @ApiBody({
    type: CreateBadgeDto,
    description: 'Data required to create a badge',
  })
  @ApiResponse({
    status: 201,
    description: 'Badge created successfully.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Champion Badge',
        description: 'Awarded for exceptional performance in battles.',
        createdAt: '2025-05-08T14:20:38.000Z',
        updatedAt: '2025-05-08T14:20:38.000Z',
      },
    },
  })
  create(@Body() createBadgeDto: CreateBadgeDto) {
    return this.badgesService.create(createBadgeDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all badges' })
  @ApiResponse({
    status: 200,
    description: 'List of badges retrieved successfully.',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Champion Badge',
          description: 'Awarded for exceptional performance in battles.',
          createdAt: '2025-05-08T14:20:38.000Z',
          updatedAt: '2025-05-08T14:20:38.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.badgesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a badge by ID' })
  @ApiParam({ name: 'id', description: 'ID of the badge', type: String })
  @ApiQuery({
    name: 'withUser',
    required: false,
    description: 'Include users associated with the badge. Set to `true` to include users.',
    example: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Badge retrieved successfully.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Champion Badge',
        description: 'Awarded for exceptional performance in battles.',
        users: [
          {
            id: '123e4567-e89b-12d3-a456-426614174002',
            email: 'user@example.com',
          },
        ],
        createdAt: '2025-05-08T14:20:38.000Z',
        updatedAt: '2025-05-08T14:20:38.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Badge not found.' })
  findOne(@Param('id') id: string, @Query('withUser') withUser: boolean) {
    return this.badgesService.findOne(id, withUser);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a badge by ID' })
  @ApiParam({ name: 'id', description: 'ID of the badge', type: String })
  @ApiBody({
    type: UpdateBadgeDto,
    description: 'Data to update the badge',
    examples: {
      example1: {
        summary: 'Valid update data',
        value: {
          name: 'Updated Badge Name',
          description: 'Updated description for the badge.',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Badge updated successfully.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Updated Badge Name',
        description: 'Updated description for the badge.',
        createdAt: '2025-05-08T14:20:38.000Z',
        updatedAt: '2025-05-08T14:25:38.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Badge not found.' })
  update(@Param('id') id: string, @Body() updateBadgeDto: UpdateBadgeDto) {
    return this.badgesService.update(id, updateBadgeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a badge by ID' })
  @ApiParam({ name: 'id', description: 'ID of the badge', type: String })
  @ApiResponse({
    status: 200,
    description: 'Badge deleted successfully.',
    schema: {
      example: {
        message: 'Badge successfully deleted.',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Badge not found.' })
  remove(@Param('id') id: string) {
    return this.badgesService.remove(id);
  }

  @Post(':id/users')
  @ApiOperation({ summary: 'Assign a badge to multiple users' })
  @ApiParam({ name: 'id', description: 'ID of the badge', type: String })
  @ApiBody({
    type: GiveBadgeToUsersDto,
    description: 'Array of user ids to assign the badge to',
    schema: {
      example: ['123e4567-e89b-12d3-a456-426614174002', '123e4567-e89b-12d3-a456-426614174003'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Badge assigned to users successfully.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Champion Badge',
        description: 'Awarded for exceptional performance in battles.',
        users: [
          {
            id: '123e4567-e89b-12d3-a456-426614174002',
            email: 'user1@example.com',
          },
          {
            id: '123e4567-e89b-12d3-a456-426614174003',
            email: 'user2@example.com',
          },
        ],
        createdAt: '2025-05-08T14:20:38.000Z',
        updatedAt: '2025-05-08T14:25:38.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Badge or users not found.' })
  giveBadgeToUsers(@Param('id') id: string, @Body() giveBadgeToUsersDto: GiveBadgeToUsersDto) {
    return this.badgesService.giveBadgeToUsers(id, giveBadgeToUsersDto.usersIds);
  }
}
