import {OnDestroy} from '@angular/core';
import {Subject} from '@app-rxjs';
import {Constructor} from '@app-model/constructor';


export function ComponentDestroyedMixin<Type extends Constructor<{}>>(Base = class {} as Type) {
  return class Mixin extends Base implements OnDestroy {
    protected componentDestroyed: Subject<void> = new Subject<void>();

    ngOnDestroy(): void {
      this.componentDestroyed.next();
      this.componentDestroyed.complete();
    }
  };
}
