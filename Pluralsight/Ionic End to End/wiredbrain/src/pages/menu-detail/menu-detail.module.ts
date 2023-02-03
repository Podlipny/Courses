import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuDetailPage } from './menu-detail';

@NgModule({
  declarations: [
    MenuDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuDetailPage),
  ],
})
export class MenuDetailPageModule {}
