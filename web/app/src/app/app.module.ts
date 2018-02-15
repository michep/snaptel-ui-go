import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ServerlistComponent } from './serverlist/serverlist.component';
import { ServereditComponent } from './serveredit/serveredit.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskinfoComponent } from './taskinfo/taskinfo.component';
import { MetriclistComponent } from './metriclist/metriclist.component';
import { PluginlistComponent } from './pluginlist/pluginlist.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ServerlistLocalService } from './shared/serverlist.local.service';
import { SnapLocalService } from './shared/snap-rest-v2.local.service';
import { Util } from './shared/util';
import { IServerlistService, ISnapService } from './shared/snap';

@NgModule({
  declarations: [
    AppComponent,
    ServerlistComponent,
    TasklistComponent,
    TaskinfoComponent,
    ServereditComponent,
    MetriclistComponent,
    PluginlistComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [
    { provide: 'ISnapService', useClass: SnapLocalService },
    { provide: 'IServerlistService', useClass: ServerlistLocalService },
    Util
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
