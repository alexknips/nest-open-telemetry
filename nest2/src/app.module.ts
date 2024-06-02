import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { App3Service } from './app3.service';
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
            clientId: 'nest2',
            brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS],
          },
          consumer: {
            groupId: 'nest2'
          }
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, App3Service],
})
export class AppModule {}
