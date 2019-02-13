import { NgModule } from "@angular/core";

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';



@NgModule({
    declarations:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NoPageFoundComponent
    ],
    exports:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NoPageFoundComponent
    ]
})

export class SharedModule{

}