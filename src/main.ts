import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// dotenv.config({
//   path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
// });


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
