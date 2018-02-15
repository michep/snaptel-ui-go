import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerlistComponent } from './serverlist/serverlist.component';
import { ServereditComponent } from './serveredit/serveredit.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskinfoComponent } from './taskinfo/taskinfo.component';
import { MetriclistComponent } from './metriclist/metriclist.component';
import { PluginlistComponent } from './pluginlist/pluginlist.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/servers'
  },
  {
    path: 'servers',
    component: ServerlistComponent
  },
  {
    path: 'servers/new',
    component: ServereditComponent
  },
  {
    path: 'servers/:serverid/edit',
    component: ServereditComponent
  },
  {
    path: 'servers/:serverid/tasks',
    component: TasklistComponent
  },
  {
    path: 'servers/:serverid/tasks/:taskid/info',
    component: TaskinfoComponent
  },
  {
    path: 'servers/:serverid/metrics',
    component: MetriclistComponent
  },
  {
    path: 'servers/:serverid/plugins',
    component: PluginlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
