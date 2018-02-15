import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Util } from '../shared/util';
import { SnapServer, SnapMetric, IServerlistService, ISnapService } from '../shared/snap';

@Component({
  selector: 'app-metriclist',
  templateUrl: './metriclist.component.html',
  styleUrls: ['./metriclist.component.css']
})
export class MetriclistComponent implements OnInit {

  public server: SnapServer = <SnapServer>{};
  public serverMetrics: SnapMetric[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject('ISnapService') private snapService: ISnapService,
    @Inject('IServerlistService') private serversService: IServerlistService,
    public util: Util
  ) { }

  ngOnInit() {
    this.serversService.getServer(this.activatedRoute.snapshot.params['serverid'])
      .subscribe(
        (server) => {
          this.server = server;
          this.snapService.getMetricList(this.server)
            .subscribe(
              (res) => {
                this.serverMetrics = res;
              }
            );
        }
      );
  }

}
