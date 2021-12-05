import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSharedModule} from './mat-shared.module';

// Components
import {SpinnerModule} from './components/spinner/spinner.module';

// Service
import {ApiService} from './api.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSharedModule.forRoot(),
    SpinnerModule
  ],
  exports: [
    MatSharedModule,
    SpinnerModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ApiService
      ]
    }
  }
}
