import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {GameService} from '../shared/api.service';
import {WinnerModel} from '../shared/models/winner.model';

@Component({
  selector: 'game-winner-list',
  templateUrl: './winner-list.component.html',
  styleUrls: ['./winner-list.component.scss']
})
export class WinnerListComponent implements OnInit {
  public winnersList$: Observable<WinnerModel[]> = new Observable();

  constructor(
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.winnersList$ = this.gameService.getUpdatesWinners();
  }

}
