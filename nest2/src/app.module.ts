import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { App3Service } from './app3.service';
import { MyLoggerModule } from './mylogger.module';
@Module({
  imports: [MyLoggerModule],
  controllers: [AppController],
  providers: [AppService, App3Service],
})
export class AppModule {}
