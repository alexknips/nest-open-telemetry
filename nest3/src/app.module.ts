import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyLoggerModule } from './mylogger.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

    
@Module({
  imports: [MyLoggerModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nest3',
            brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS],
          },
          consumer: {
            groupId: 'nest3'
          }
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
