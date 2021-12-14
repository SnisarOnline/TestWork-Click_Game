export class WinnerModel {
  id: number | null;
  winner: string;
  date: string;

  constructor(init: Partial<WinnerModel>) {
    this.id = init.id ?? null;
    this.winner = init.winner || 'Noname';
    this.date = init.date || new Date().toString();
  }

}

