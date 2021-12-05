import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from '@app-rxjs';
import {SpinnerType, OptionSpinner} from './models';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit, OnDestroy {
  static $counter = new Subject<boolean>();
  public visible = false;
  public SPINNER_TYPE = SpinnerType;

  @Input() public optionSpinner = new OptionSpinner();

  private subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = SpinnerComponent.$counter.subscribe(value => {
      setTimeout(() => (this.visible = value), 0);
    });
    if (SpinnerComponent.$counter.observers.length === 1) {
      SpinnerComponent.$counter.observers[0].next(true);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (SpinnerComponent.$counter.observers[0]) {
      SpinnerComponent.$counter.observers[0].next(false);
    }
  }
}
