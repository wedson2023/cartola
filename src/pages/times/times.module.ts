import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimesPage } from './times';

@NgModule({
  declarations: [
    TimesPage,
  ],
  imports: [
    IonicPageModule.forChild(TimesPage),
  ],
})
export class TimesPageModule {}
