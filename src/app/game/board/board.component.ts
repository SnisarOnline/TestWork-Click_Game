import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {GameModeModel} from '../../../../old_src/app/shared/models/gameMode.model';
import {ComponentDestroyedMixin} from '@app-shared/mixins';


@Component({
  selector: 'game-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent extends ComponentDestroyedMixin() implements OnInit {
  // SettingsGame
  public toppingList: any[] = [];
  public gameSettings: FormGroup = this.fb.group({
    level: [null, Validators.required],
    name: [null, Validators.required]
  });

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    // this.apiService.gameSettings()
    //   .subscribe((setting: any[]) => {
    //     this.toppingList = setting;
    //     this.initBoard(this.toppingList[0]);
    //   });
  }

  private initBoard() {}
  public onChangBoard(quantitySquares: any) {}

  /**
   * start game
   */
  public onStartGame() {}
}
