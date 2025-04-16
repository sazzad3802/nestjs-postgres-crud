import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// dotenv.config({
//   path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
// });


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  console.log(`Running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`Server is running on port ${port}`);
  await app.listen(port);
}
bootstrap();
