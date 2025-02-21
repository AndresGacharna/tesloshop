import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { Product, ProductImage } from './entities';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[
    TypeOrmModule.forFeature([Product, ProductImage]),
    AuthModule
  ],
  exports:[
    ProductsService,
    TypeOrmModule, //Para exportar Product y Product Image, ya que vienen separados... Asi se pueden manipular funciones entre módulos en este caso el "seed" (Miralo como si cada modulo fuera un universo y los imports y exports serian la conexion de ellos o los portales)
    
  ]
})
export class ProductsModule {}
