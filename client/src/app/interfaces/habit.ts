export interface IHabit {
  name: string;
  schedule: string;
  hasTimer: boolean;
  hasRating: boolean;
  color: string;
  icon: string;
  difficulty: string;
  comment: string;
  timeframe: string;
  user: string;
  categories: string;
  _id: string;

  isIconUndefined(): boolean;
  isCommentUndefined(): boolean;
  isOnSchedule(): boolean;
  isConmmentEmpty(): boolean;
  isTimeframeUndefined(): boolean;
  getIcon(): string;
  getColor(): string;
  getName(): string;
  getComment(): string;
  getTimeframe(): string;

  returnIcon(): any;
  getDifficulty(): string;
}
