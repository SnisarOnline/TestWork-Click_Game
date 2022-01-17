import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ComponentDestroyedMixin} from '@app-shared/mixins';
import {takeUntil, interval, take} from '@app-rxjs';
import {GameService} from '../shared/game-api.service';
import {GameDifficultyModelForArr} from '../shared/models/gameDifficultyModel.model';
import {SquareModel} from '../shared/models/square.model';
import {WinnerModel} from '../shared/models/winner.model';


@Component({
  selector: 'game-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent extends ComponentDestroyedMixin() implements OnInit {
  // SettingsGame
  public gameMode: GameDifficultyModelForArr[] = [];
  public gameSettings: FormGroup = this.fb.group({
    level: [null, Validators.required],
    name: [null, Validators.required]
  });
  public gameIsStarted: boolean = false;
  public isFirstGame: boolean = true;

  // Board
  public squaresOnboard: SquareModel[] = []
  // @ts-ignore
  @ViewChild('BoardSize') boardSize: ElementRef<HTMLElement>

  // Message
  public message: string = ''

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private gameService: GameService,
    private renderer: Renderer2
  ) {
    super();
  }

  ngOnInit(): void {
    this.gameService.getArrSettings()
      .subscribe((setting: GameDifficultyModelForArr[]) => {
        this.gameMode = setting;
        if (setting.length > 0) {
          this.gameSettings.patchValue({level: this.gameMode[0]})
          this.initBoard(this.gameMode[0]);
        }
      });
  }

  private initBoard(gameMode: GameDifficultyModelForArr) {
    this.squaresOnboard = [];
    for (let i = 0; i < gameMode.field * 4; i++) {
      this.squaresOnboard.push(
        new SquareModel({id: i})
      )
    }

    if (this.squaresOnboard.length <= 20) {
      this.renderer.setStyle(this.boardSize.nativeElement, 'max-width', '300px')
    }
    else if (this.squaresOnboard.length <= 40) {
      this.renderer.setStyle(this.boardSize.nativeElement, 'max-width', '480px')
    }
    else if (this.squaresOnboard.length <= 60) {
      this.renderer.setStyle(this.boardSize.nativeElement, 'max-width', '600px')
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

  private blockUnlockForm() {
    this.gameIsStarted = !this.gameIsStarted
    if (this.gameIsStarted) {
      this.gameSettings.controls['level'].disable();
      this.gameSettings.controls['name'].disable();
    }
    else {
      this.gameSettings.controls['level'].enable();
      this.gameSettings.controls['name'].enable();
    }
  }

  private resetResultGame() {
    this.isFirstGame = false
    this.initBoard(this.gameSettings.value.level);
  }

  private showMessage(text: string, timeShow = 5000) {
    this.message = text
    setTimeout( () => this.message = '', timeShow)
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
      this.showMessage(`player ${user} won`);
      this.gameService.sentResult(new WinnerModel({winner: user}))
    }
    else {
      this.showMessage('computer won');
    }

    this.resetResultGame();
    this.blockUnlockForm();
  }

  public onChangBoard(quantitySquares: GameDifficultyModelForArr) {
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

    this.blockUnlockForm();

    const config: GameDifficultyModelForArr = this.gameSettings.value.level;
    const randomArrNumbers = this.randomSquares(0, this.squaresOnboard.length);

    // config.delay = 300; // todo: test

    interval(config.delay).pipe(
      takeUntil(this.componentDestroyed),
      take(this.squaresOnboard.length)
    ).subscribe(x => {
      console.log('Next: ', x)
      const someNumberSquare = randomArrNumbers[x]
      const someSquare = this.squaresOnboard[someNumberSquare];
      someSquare.onActive(config.delay);

      if (x === (this.squaresOnboard.length - 1)) {
        setTimeout(() => this.checkResultGame(), config.delay)
      }
    });
  }

  public onClickSquare(square: any) {
    if (square.active) {
      square.win = true;
    }
  }

}
