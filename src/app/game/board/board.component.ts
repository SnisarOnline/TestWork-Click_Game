import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ComponentDestroyedMixin} from '@app-shared/mixins';
import {GameService} from '../shared/game-api.service';
import {GameDifficultyModel} from '../shared/models/gameMode.model';
import {SquareModel} from '../shared/models/square.model';


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
        console.log('Game mode:', setting);
        this.gameMode = setting;
        if (setting.length > 0) {
          this.gameSettings.patchValue({
            level: this.gameMode[1]
          })
          this.initBoard(this.gameMode[1]);
        }
      });
  }

  private initBoard(gameMode: GameDifficultyModel) {
    this.squaresOnboard = [];
    for (let i = 0; i < gameMode.field * 3; i++) {
      this.squaresOnboard.push(
        new SquareModel({
          id: i,
          active: false,
          win: false,
          losing: false,
        })
      )
    }
  }

  public onChangBoard(quantitySquares: any) {
    this.initBoard(quantitySquares);
  }

  /**
   * start game
   */
  public onStartGame() {

  }

  public userClickSquare(square: any) {}
}
