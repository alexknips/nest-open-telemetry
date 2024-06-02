import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { App2Service } from './app2.service';
import { ClientKafka } from '@nestjs/microservices/client/client-kafka';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly app2Service: App2Service,
    @Inject('KAFKA_SERVICE') private readonly  client: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('deepcalls')
  async deepCalls(): Promise<string> {
    const local = this.appService.getHello();
    const app2 = await this.app2Service.callApp2();
    return `Hellos from: ${local}, ${app2}`;
  }

  @Get('kafka')
  async kafka(): Promise<string> {
    const local = this.appService.getHello();
    this.client.emit<string>('nest1_event', local);
    return `Hellos from: ${local}`;
  }
}
