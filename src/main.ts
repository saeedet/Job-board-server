import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { jwtConstants } from './utils/constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APPLICATION_PORT);
}
bootstrap();
