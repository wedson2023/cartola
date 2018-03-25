import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartidasPage } from './partidas';

@NgModule({
  declarations: [
    PartidasPage,
  ],
  imports: [
    IonicPageModule.forChild(PartidasPage),
  ],
})
export class PartidasPageModule {}
