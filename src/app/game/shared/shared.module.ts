import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// Service
import {GameService} from './game-api.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: []
})
export class GameSharedModule {
  static forRoot(): ModuleWithProviders<GameSharedModule> {
    return {
      ngModule: GameSharedModule,
      providers: [
        GameService
      ]
    }
  }
}
