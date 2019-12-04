import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common'; //Directivas, pipes, etc...

import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

// Modules
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NoPageFoundComponent,
        ModalUploadComponent
    ],
    exports:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NoPageFoundComponent,
        ModalUploadComponent
    ]
})

export class SharedModule{

}