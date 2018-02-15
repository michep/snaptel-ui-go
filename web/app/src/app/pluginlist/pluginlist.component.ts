import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Util } from '../shared/util';
import { SnapServer, SnapPlugin, IServerlistService, ISnapService } from '../shared/snap';

@Component({
  selector: 'app-pluginlist',
  templateUrl: './pluginlist.component.html',
  styleUrls: ['./pluginlist.component.css']
})
export class PluginlistComponent implements OnInit {

  public server: SnapServer = <SnapServer>{};
  public serverPlugins: SnapPlugin[] = [];

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
          this.snapService.getPluginList(this.server)
            .subscribe(
              (res) => {
                this.serverPlugins = res;
              }
            );
        }
      );
  }

}
