import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Servicios

import {
  SettingsService,
  SidebarService,
  SharedService
} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService
  ]
})
export class ServiceModule { }
