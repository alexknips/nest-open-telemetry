import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { MyLoggerModule } from './mylogger.module';
import { MyLoggerService } from './mylogger.service';

@Injectable()
export class App3Service {
  // private readonly logger = new Logger(App3Service.name);
  constructor(private readonly myLoggerService: MyLoggerService) {}

  async callApp3(): Promise<string> {
    try {
      // this.logger.verbose({ foo: 'bar' }, 'baz %s', 'qux');
      // this.logger.debug('foo %s %o', 'bar', { baz: 'qux' });
      // this.logger.log('foo');
      this.myLoggerService.customLog(
        'some custom logging that should also go to OTEL',
      );
      const response = await axios.get('http://nestapp3:3000/'); // use internal port and not exposed one
      return response.data.toString();
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error.message);
      throw error;
    }
  }
}
