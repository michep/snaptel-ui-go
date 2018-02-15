import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Util } from '../shared/util';
import { SnapServer, SnapTask, IServerlistService, ISnapService } from '../shared/snap';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  public server: SnapServer = <SnapServer>{};
  public serverTasks: SnapTask[] = [];

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
          this.snapService.getTaskList(this.server)
            .subscribe(
              (res) => {
                this.serverTasks = res;
              }
            );
        }
      );
  }

  stopTask(task: SnapTask) {
    this.snapService.stopTask(this.server, task.id)
      .subscribe(
        () => task.task_state = 'Stopped'
      );
  }

  startTask(task: SnapTask) {
    this.snapService.startTask(this.server, task.id)
      .subscribe(
        () => task.task_state = 'Running'
      );
  }

}
