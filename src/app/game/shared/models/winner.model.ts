export class WinnerModel {
  winner: string;
  date: string;

  constructor(init: Partial<WinnerModel>) {
    this.winner = init.winner || 'Noname';
    this.date = init.date || new Date().toString();
  }

}

