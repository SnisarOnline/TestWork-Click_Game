import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject, takeUntil} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiService} from '@app-shared/api.service';
import {GameDifficultyModel} from './models/gameMode.model';
import {WinnerModel} from './models/winner.model';

@Injectable({providedIn: 'root'})
export class GameService implements OnDestroy {

  private serviceDestroyed: Subject<void> = new Subject<void>();
  private winnersEvent = new BehaviorSubject<WinnerModel[]>([]);

  constructor(
    private api: ApiService
  ) {
    this.getWinners();
  }

  ngOnDestroy(): void {
    this.serviceDestroyed.next();
    this.serviceDestroyed.complete();
  }

  public getSettings(): Observable<GameDifficultyModel[]> {
    /*
    return new Observable( (subscriber) => {
      const base = [
        { delay: 2000, field: 3, name: 'Default', },
        { delay: 1800, field: 5, name: 'easyMode', },
        { delay: 1000, field: 10, name: 'normalMode', },
        { delay: 800, field: 15, name: 'hardMode', },
        { delay: 650, field: 20, name: 'superHardMode', }
      ]
      subscriber.next(base);
    })
*/

    return this.api.getObservable<any[]>('game-settings')
      .pipe(
        takeUntil(this.serviceDestroyed),
        map((setting: any[]) => {
          const settingList: any[] = [];

          Object.keys(setting).forEach((item: any) => {
            settingList.push(
              new GameDifficultyModel({
                name: item,
                delay: setting[item].delay,
                field: setting[item].field
              })
            );
          });

          return settingList;
        })
      );
  }

  private getWinners(): void {
    this.api.getObservable<WinnerModel[]>('winners')
      .pipe(takeUntil(this.serviceDestroyed))
      .subscribe((list: any) => this.winnersEvent.next(list));
  }

  public getUpdatesWinners(): Observable<WinnerModel[]> {
    return this.winnersEvent.pipe(takeUntil(this.serviceDestroyed))
  }

  public sentResult(post: any): any {
    return this.api.postObservable('winners', post)
      .pipe(takeUntil(this.serviceDestroyed))
      .subscribe(() => this.getWinners());
  }

}
