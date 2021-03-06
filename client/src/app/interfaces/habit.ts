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

  getComment(habitComment: string): string;
  setComment(comment: string): void;
}
