import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import tracer from './tracer';
import { Logger } from 'nestjs-pino';


async function bootstrap() {
  // Start SDK before nestjs factory create
  await tracer.start();
  const app = await NestFactory.create(AppModule,{ bufferLogs: false });
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
