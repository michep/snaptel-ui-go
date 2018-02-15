import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Util } from '../shared/util';
import { SnapServer, SnapTaskInfo, IServerlistService, ISnapService } from '../shared/snap';

@Component({
  selector: 'app-taskinfo',
  templateUrl: './taskinfo.component.html',
  styleUrls: ['./taskinfo.component.css']
})
export class TaskinfoComponent implements OnInit {

  public server: SnapServer = <SnapServer>{};
  public taskInfo: SnapTaskInfo = <SnapTaskInfo>{};
  public metrics: string[] = [];

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
          this.snapService.getTaskInfo(server, this.activatedRoute.snapshot.params['taskid'])
            .subscribe(
              (res) => {
                this.taskInfo = res;
                this.metrics = Object.keys(this.taskInfo.workflow.collect.metrics);
              }
            );
        }
      );
  }

  stopTask(task: SnapTaskInfo) {
    this.snapService.stopTask(this.server, task.id)
      .subscribe(
        () => task.task_state = 'Stopped'
      );
  }

  startTask(task: SnapTaskInfo) {
    this.snapService.startTask(this.server, task.id)
      .subscribe(
        () => task.task_state = 'Running'
      );
  }

}
