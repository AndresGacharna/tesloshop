import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    //TypeOrmModule fue instalado antes de usarlo con este comando "yarn add @nestjs/typeorm typeorm"
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database : process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true, //
      synchronize: true, // Sincroniza la base de datos con cualquier cambio, si elimino columnas, creo, etc (En produccion esto no se utiliza tanto).
      
    }),

    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname,'..','public'), // ESTO ES DE UN EJEMPLO QUE SE HIZO PERO SE PUEDE COMENTAR
    }),

    ProductsModule,

    CommonModule,

    SeedModule,

    FilesModule,

    AuthModule,

    MessagesWsModule,

  ],
})
export class AppModule {}
