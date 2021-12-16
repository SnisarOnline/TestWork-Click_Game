export class GameDifficultyModelForArr {
  public name: string;
  public delay: number;
  public field: number;

  constructor(init: Partial<GameDifficultyModelForArr>) {
    this.name = init.name ?? 'Default';
    this.delay = init.delay ?? 2000;
    this.field = init.field ?? 3;
  }
}

export interface GameDifficultyModelForObject {
  [key: string]: { delay: number, field: number }
}
