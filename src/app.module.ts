import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { AuctionsModule } from './auctions/auctions.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const typeOrmConfig =
          configService.get<TypeOrmModuleOptions>('typeorm');
        if (!typeOrmConfig) {
          throw new Error('Fallo en la configuración de TypeORM');
        }
        return typeOrmConfig;
      },
    }),
    UsersModule,
    ProductsModule,
    AuctionsModule,
    CategoryModule,
  ],
})
export class AppModule {}
