import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { Util } from './util';

import { SnapServer, SnapTask, SnapTaskInfo, SnapMetric, SnapPlugin, ISnapService } from './snap';

@Injectable()
export class SnapLocalService implements ISnapService {

  private localServerApi = location.origin + "/snapapi/";

  constructor(private http: Http, private util: Util) {
  }

  getTaskList(server: SnapServer): Observable<SnapTask[]> {
    return this.http.get(this.localServerApi + 'tasks/' + encodeURIComponent(server.key))
      .timeout(2000)
      .map(
        data => {
          return data.json()['tasks'] as SnapTask[];
        }
      );
  }

  getTaskInfo(server: SnapServer, taskid: string): Observable<SnapTaskInfo> {
    return this.http.get(this.localServerApi + 'tasks/' + encodeURIComponent(server.key) + '/' + taskid)
      .timeout(2000)
      .map(
        data => {
          return data.json() as SnapTaskInfo;
        }
      );
  }

  stopTask(server: SnapServer, taskid: string): Observable<string> {
    return this.http.put(this.localServerApi + 'tasks/' + encodeURIComponent(server.key) + '/' + taskid + '?action=stop', null)
      .timeout(2000)
      .map(
        data => {
          return data.text();
        }
      );
  }

  startTask(server: SnapServer, taskid: string): Observable<string> {
    return this.http.put(this.localServerApi + 'tasks/' + encodeURIComponent(server.key) + '/' + taskid + '?action=start', null)
    .timeout(2000)
    .map(
      data => {
        return data.text();
      }
    );
}

  getMetricList(server: SnapServer): Observable<SnapMetric[]> {
    return this.http.get(this.localServerApi + 'metrics/' + encodeURIComponent(server.key))
      .timeout(2000)
      .map(
        (data) => {
          return data.json()['metrics'] as SnapMetric[];
        }
      );
  }

  getPluginList(server: SnapServer): Observable<SnapPlugin[]> {
    return this.http.get(this.localServerApi + 'plugins/' + encodeURIComponent(server.key))
      .timeout(2000)
      .map(
        (data) => {
          return data.json()['plugins'] as SnapPlugin[];
        }
      );
  }

}
