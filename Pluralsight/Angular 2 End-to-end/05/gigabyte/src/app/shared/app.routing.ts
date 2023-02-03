import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { ErrorComponent } from '../error/error.component';
import { BlogDetailComponent } from '../blogDetail/blog-detail.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'post/:id', component: BlogDetailComponent },
            { path: '' , component: HomeComponent},
            { path: '**' , component: ErrorComponent }
        ])    
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        BlogDetailComponent
    ]
})
export class AppRoutingModule {}

