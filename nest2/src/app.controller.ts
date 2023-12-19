import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { App3Service } from './app3.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly app3Service: App3Service) {}

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
}
