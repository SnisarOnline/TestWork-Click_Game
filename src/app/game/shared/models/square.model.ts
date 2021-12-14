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

  public onActive(timeout: number): void {
    this.active = true;
    setTimeout( () => {
      if (!this.win) {
        this.losing = true;
      }
    }, timeout)
  }

}
