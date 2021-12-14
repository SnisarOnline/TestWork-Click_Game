export class SquareModel {
  id: number | null;
  active: boolean;
  losing: boolean;
  win: boolean;

  constructor(init: Partial<SquareModel>) {
    this.id = init.id ?? null;
    this.active = init.active ?? false;
    this.losing = init.losing ?? false;
    this.win = init.win ?? false;
  }

}
