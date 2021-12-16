import {Component} from '@angular/core';
import {OptionSpinner, SpinnerType} from '@app-shared/components/spinner/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'TestWork';
  public isDataLoading = true;
  public optionSpinner: OptionSpinner = new OptionSpinner({
    bgColor: 'rgb(0 0 0 / 50%)',
    loadingInside: false,
    type: SpinnerType.BASE,
    themePalette: 'accent',
  });

  constructor() {
    setTimeout(() => (this.isDataLoading = false), 300);
  }
}
