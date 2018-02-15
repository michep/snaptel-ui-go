import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mergeMap';

import { SnapServer, IServerlistService, ISnapService } from '../shared/snap';
import { Util } from '../shared/util';

@Component({
  selector: 'app-serverlist',
  templateUrl: './serverlist.component.html',
  styleUrls: ['./serverlist.component.css']
})
export class ServerlistComponent implements OnInit, OnDestroy {

  public servers: SnapServer[] = [];
  private serversAvailCheckTimer: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject('ISnapService') private snapService: ISnapService,
    @Inject('IServerlistService') private serversService: IServerlistService,
    private util: Util
  ) { }

  ngOnInit() {
    this.updateServerList();
  }

  ngOnDestroy() {
    this.serversAvailCheckTimer.unsubscribe();
  }

  private updateServerList() {
    if (this.serversAvailCheckTimer !== undefined) {
      this.serversAvailCheckTimer.unsubscribe();
    }

    this.serversService.getServerList()
      .subscribe(
        (servers) => {
          this.servers = servers;
          // this.serversAvailCheckTimer = Observable.timer(0, 10000)
          this.serversAvailCheckTimer = Observable.of({})
            .mergeMap(
              () => {
                return Observable.from(this.servers);
              }
            )
            .subscribe(
              (server) => {
                this.checkAvail(server);
              }
            );
        }
    );
  }

  private checkAvail(server: SnapServer) {
    this.snapService.getPluginList(server)
      .subscribe(
        (res) => {
          server.available = true;
        },
        (err) => {
          server.available = false;
        },
      );
  }

  private checkAvailTrue(server: SnapServer) {
    server.available = true;
  }

}
