import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ComponentDestroyedMixin} from '@app-shared/mixins';
import {takeUntil, interval, Subject, take} from '@app-rxjs';
import {GameService} from '../shared/game-api.service';
import {GameDifficultyModel} from '../shared/models/gameMode.model';
import {SquareModel} from '../shared/models/square.model';
import {WinnerModel} from '../shared/models/winner.model';


@Component({
  selector: 'game-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent extends ComponentDestroyedMixin() implements OnInit {
  // SettingsGame
  public gameMode: GameDifficultyModel[] = [];
  public gameSettings: FormGroup = this.fb.group({
    level: [null, Validators.required],
    name: [null, Validators.required]
  });

  // Board
  public squaresOnboard: SquareModel[] = []
  private changeBoard: Subject<void> = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private gameService: GameService
  ) {
    super();
  }

  ngOnInit(): void {
    this.gameService.getSettings()
      .subscribe((setting: GameDifficultyModel[]) => {
        console.log('All game mode:', setting);
        this.gameMode = setting;
        if (setting.length > 0) {
          this.gameSettings.patchValue({level: this.gameMode[0]})
          this.initBoard(this.gameMode[0]);
        }
      });
  }

  private initBoard(gameMode: GameDifficultyModel) {
    this.squaresOnboard = [];
    for (let i = 0; i < gameMode.field * 3; i++) {
      this.squaresOnboard.push(
        new SquareModel({id: i})
      )
    }
  }

  private randomSquares(min = 0, maxNumberSquares: number): number[] {
    const exitIdNumbers = [];
    const result = [];

    for (let i = min; i < maxNumberSquares; i++) {
      exitIdNumbers.push(i);
    }

    for (let i = 0; i < maxNumberSquares; i++) {
      const range = Math.floor(Math.random() * (exitIdNumbers.length - min)) + min;
      const firstElement = exitIdNumbers.splice(range, 1)[0];
      result.push(firstElement);
    }

    return result;
  }

  private checkResultGame() {
    const user = this.gameSettings.value.name;

    const res = this.squaresOnboard.reduce((prev, current) => {
      current.losing ? prev.lost += 1 : prev.win += 1;
      return prev;
    }, {
      win: 0,
      lost: 0
    })

    if (res.win > res.lost) {
      alert('Win')
      this.gameService.sentResult(new WinnerModel({winner: user}))
    } else {
      alert('Lost')
    }
  }

  public onChangBoard(quantitySquares: any) {
    this.changeBoard.next()
    this.changeBoard.complete();
    this.initBoard(quantitySquares);
  }

  /**
   * start game
   */
  public onStartGame(event: SubmitEvent) {
    event.preventDefault();
    if (this.gameSettings.invalid) {
      return
    }

    const config: GameDifficultyModel = this.gameSettings.value.level;
    const randomArrNumbers = this.randomSquares(0, this.squaresOnboard.length);

    config.delay = 800; // todo: test

    interval(config.delay).pipe(
      takeUntil(this.changeBoard),
      takeUntil(this.componentDestroyed),
      take(this.squaresOnboard.length)
    ).subscribe(x => {
      console.log('Next: ', x)
      const someNumberSquare = randomArrNumbers[x]
      const someSquare = this.squaresOnboard[someNumberSquare];
      someSquare.onActive(config.delay);

      if (x === (this.squaresOnboard.length - 1)) {
        setTimeout(() => this.checkResultGame() , config.delay )
      }
    });
  }

  public onClickSquare(square: any) {
    if (square.active) {
      square.win = true;
    }
  }

}
