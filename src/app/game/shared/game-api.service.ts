import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, delay, Observable, Subject, takeUntil, map} from '@app-rxjs';
import {ApiService} from '@app-shared/api.service';
import {GameDifficultyModelForArr, GameDifficultyModelForObject} from './models/gameDifficultyModel.model';
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

  public getObjectSetting(): Observable<GameDifficultyModelForObject> {
    /*
    return new Observable((subscriber) => {
      const base = `{
        'easyMode': {'field': 5, 'delay': 2000},
        'normalMode': {'field': 10, 'delay': 1000},
        'hardMode': {'field': 15, 'delay': 900}
      }`;
      subscriber.next(JSON.parse(base));
    })
    */
    return this.api.getObservable<GameDifficultyModelForObject>('game-settings')
      .pipe(
        takeUntil(this.serviceDestroyed),
        delay(1000)
      );
  }

  public getArrSettings(): Observable<GameDifficultyModelForArr[]> {
    /*
    return new Observable( (subscriber) => {
      const base = [
        { name: 'Default', field: 3, delay: 2000 },
        { name: 'easyMode', field: 5, delay: 1800 },
        { name: 'normalMode', field: 10, delay: 1000 },
        { name: 'hardMode', field: 15, delay: 800 },
        { name: 'superHardMode', field: 20, delay: 650 }
      ]
      subscriber.next(base);
    })
*/

    return this.getObjectSetting()
      .pipe(
        takeUntil(this.serviceDestroyed),
        map((setting: GameDifficultyModelForObject) => {
          const settingList: any[] = [];

          Object.keys(setting).forEach((item: string) => {
            settingList.push(
              new GameDifficultyModelForArr({
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

  public sentResult(post: WinnerModel): any {
    return this.api.postObservable('winners', post)
      .pipe(takeUntil(this.serviceDestroyed))
      .subscribe(() => this.getWinners());
  }

}
