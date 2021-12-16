import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public title = 'Game In Dots';
  public apiInfoUrl: string = environment.apiInfoUrl;

  constructor(title: Title) {
    title.setTitle('Game In Dots');
  }

  ngOnInit(): void {}

}
