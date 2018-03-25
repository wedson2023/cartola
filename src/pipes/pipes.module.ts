import { NgModule } from '@angular/core';
import { PosicaoJogadorPipe } from './posicao-jogador/posicao-jogador';
import { StatusJogadorPipe } from './status-jogador/status-jogador';
@NgModule({
	declarations: [PosicaoJogadorPipe,
    StatusJogadorPipe],
	imports: [],
	exports: [PosicaoJogadorPipe,
    StatusJogadorPipe]
})
export class PipesModule {}
