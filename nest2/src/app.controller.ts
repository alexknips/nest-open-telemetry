import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { App3Service } from './app3.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import api from '@opentelemetry/api';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly app3Service: App3Service,
    @Inject('KAFKA_SERVICE') private readonly  client: ClientKafka) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('deepcalls')
  async deepCalls(): Promise<string> {
    const local = this.appService.getHello();
    const app3 = await this.app3Service.callApp3();
    return `Hellos from: ${local}, ${app3}`;
  }

  @EventPattern('nest1_event')
  async handleUserCreated(data: Record<string, string>) {
    console.log('Received data:', data);
    const local = this.appService.getHello();

    const activeSpan = api.trace.getSpan(api.context.active())

    this.client.emit<string>('nest2_event', local);
  }
}
