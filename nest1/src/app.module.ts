import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { App2Service } from './app2.service';
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
            clientId: 'nest1',
            brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS],
          },
          consumer: {
            groupId: 'nest1'
          }
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, App2Service],
})
export class AppModule {}
