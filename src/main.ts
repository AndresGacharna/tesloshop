import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api'); //Este es un prefijo que se le añade a la url: http://localhost:3000/api/products

  app.useGlobalPipes( 
    new ValidationPipe({ 
      whitelist: true, 
      forbidNonWhitelisted: true,
    })
  );

  app.enableCors({
    origin: ['http://localhost:3001'], // pendiente CORS para peticiones desde el mismo localhost
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: false,
  });

  const config = new DocumentBuilder()
  .setTitle('Teslo RESTfull Api')
  .setDescription('Teslo shop endpoints')
  .setVersion('1.0')
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`App running on port ${process.env.PORT}`)
}
bootstrap();
