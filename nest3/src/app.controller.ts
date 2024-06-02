import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_SERVICE') private readonly  client: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('nest2_event')
  async handleUserCreated(data: Record<string, string>) {
    console.log('Received data:', data);
    const local = this.appService.getHello();
    console.log('Finished with the nest3 call', local);
  }
}
