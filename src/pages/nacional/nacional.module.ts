import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NacionalPage } from './nacional';

@NgModule({
  declarations: [
    NacionalPage,
  ],
  imports: [
    IonicPageModule.forChild(NacionalPage),
  ],
})
export class NacionalPageModule {}
