import {Component, OnInit} from '@angular/core';
import {ApiService} from '@app-shared/api.service';
// import {WinnerModel} from '@app-shared/models/winner.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'game-winner-list',
  templateUrl: './winner-list.component.html',
  styleUrls: ['./winner-list.component.scss']
})
export class WinnerListComponent implements OnInit {

  public winnersList$: Observable<any[]> = new Observable();

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // this.winnersList$ = this.apiService.getList();
  }

}
