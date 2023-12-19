import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { App2Service } from './app2.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, App2Service],
})
export class AppModule {}
