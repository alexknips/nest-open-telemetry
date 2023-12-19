import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { App2Service } from './app2.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly app2Service: App2Service) {}

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
}
