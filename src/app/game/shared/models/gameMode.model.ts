export class GameDifficultyModel {
  public name: string;
  public delay: number;
  public field: number;

  constructor(init: Partial<GameDifficultyModel>) {
    this.name = init.name ?? 'Default';
    this.delay = init.delay ?? 2000;
    this.field = init.field ?? 3;
  }
}
