import { NgModule } from '@angular/core';
import { PosicaoJogadorPipe } from './posicao-jogador/posicao-jogador';
import { StatusJogadorPipe } from './status-jogador/status-jogador';
import { FilterPipe } from './filter/filter';
import { IconMenuPipe } from './icon-menu/icon-menu';
@NgModule({
	declarations: [PosicaoJogadorPipe,
    StatusJogadorPipe,
    FilterPipe,
    IconMenuPipe],
	imports: [],
	exports: [PosicaoJogadorPipe,
    StatusJogadorPipe,
    FilterPipe,
    IconMenuPipe]
})
export class PipesModule {}
