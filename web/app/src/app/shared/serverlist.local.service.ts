import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Util } from './util';

import { SnapServer, IServerlistService } from './snap';


@Injectable()
export class ServerlistLocalService implements IServerlistService {

  private localServerApi = location.origin + "/serversapi/";

  constructor(private http: Http, private util: Util) {
  }

  getServer(key: string): Observable<SnapServer> {
    return this.http.get(this.localServerApi + encodeURIComponent(key)).pipe(
      map(
        data => {
          return data.json() as SnapServer;
        }
      )
    );
  }

  getServerList(): Observable<SnapServer[]> {
    return this.http.get(this.localServerApi).pipe(
      map(
        data => {
          const servers: SnapServer[] = [];
          const d = data.json();
          for (const k of Object.keys(d)) {
            servers.push(d[k] as SnapServer);
          }
          servers.sort(this.compareSnapServers);
          return servers;
        }
      )
    );
  }

  private compareSnapServers(a: SnapServer, b: SnapServer): number {
    if (a.host === b.host) {
      return 0;
    }
    if (a.host < b.host) {
      return -1;
    } else {
      return 1;
    }
  }

}
