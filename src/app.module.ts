import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.resolve(__dirname, `../.env.${process.env.NODE_ENV || 'development'}`),
        path.resolve(__dirname, '../.env'),
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const baseConfig = configService.get('DATABASE_URL') 
          ? { url: configService.get('DATABASE_URL') } 
          : {
              host: configService.get('DATABASE_HOST'),
              port: configService.get('DATABASE_PORT'),
              username: configService.get('DATABASE_USER'),
              password: configService.get('DATABASE_PASSWORD'),
              database: configService.get('DATABASE_NAME'),
            };
    
        return {
          type: 'postgres',
          ...baseConfig,
          synchronize: configService.get('NODE_ENV') !== 'production',
          ssl: configService.get('NODE_ENV') === 'production' 
            ? { rejectUnauthorized: false } 
            : false,
          autoLoadEntities: true,
          retryDelay: 3000,
          retryAttempts: 5,
        };
      },
    }),
    UserModule,
  ],
})
export class AppModule {}
