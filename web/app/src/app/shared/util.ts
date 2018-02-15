import { Injectable } from '@angular/core';
import { SnapServer } from './snap';

@Injectable()
export class Util {

  getDateString(ts: number): string {
    return new Date(ts * 1000).toLocaleString('ru');
  }

  getServerString(server: SnapServer): string {
    return server.key;
  }

}
