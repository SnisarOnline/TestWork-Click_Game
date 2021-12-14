import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameRoutingModule} from './game-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

import {GameComponent} from './game.component';
import {BoardComponent} from './board/board.component';
import {WinnerListComponent} from './winner-list/winner-list.component';
import {SharedModule} from '@app-shared/shared.module';
import {GameSharedModule} from './shared/shared.module';


@NgModule({
  declarations: [
    GameComponent,
    BoardComponent,
    WinnerListComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    GameSharedModule.forRoot(),
  ]
})
export class GameModule {}
