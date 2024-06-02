import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import api from '@opentelemetry/api';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLoggerService extends ConsoleLogger {
  customLog(message: string) {
    const activeSpan = api.trace.getSpan(api.context.active())
    activeSpan.addEvent(message)
    this.log(message);
  }
}