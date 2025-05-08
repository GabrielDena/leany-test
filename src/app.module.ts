import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PokemonsModule } from './pokemons/pokemons.module';
import { BadgesModule } from './badges/badges.module';
import { ExternalModule } from './external/external.module';
import { AddressesModule } from './addresses/addresses.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'user'),
        password: configService.get<string>('DB_PASSWORD', 'password'),
        database: configService.get<string>('DB_NAME', 'leanytest'),
        synchronize: configService.get<boolean>('DB_SYNC', false),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        logging: false,
      }),
    }),
    UsersModule,
    PokemonsModule,
    BadgesModule,
    ExternalModule,
    AddressesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
