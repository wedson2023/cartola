import { NgModule } from '@angular/core';
import { MercadoComponent } from './mercado/mercado';
import { PontuacaoComponent } from './pontuacao/pontuacao';
@NgModule({
	declarations: [MercadoComponent,
    PontuacaoComponent],
	imports: [],
	exports: [MercadoComponent,
    PontuacaoComponent]
})
export class ComponentsModule {}
