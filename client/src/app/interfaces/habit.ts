export interface Habit {
  name: string;
  schedule: string;
  hasTimer: boolean;
  hasRating: boolean;
  user?: string;
  categoryId?: string;
  _id?: string;
}
