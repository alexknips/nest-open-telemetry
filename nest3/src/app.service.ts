import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new Error('CRASH!!!!')
    return 'Hello from nest3!';
  }
}
