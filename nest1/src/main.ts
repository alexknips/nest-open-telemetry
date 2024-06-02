import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import tracer from './tracer';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Start SDK before nestjs factory create
  await tracer.start();
  console.log(`process.env.KAFKA_BOOTSTRAP_SERVERS: ${process.env.KAFKA_BOOTSTRAP_SERVERS}`)

  const app = await NestFactory.create(AppModule);
  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'nest1',
        brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS],
      },
      consumer: {
        groupId: 'nest1'
      }
    }
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
