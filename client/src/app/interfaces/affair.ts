export interface Affair {
    name: string;
    schedule: string;
    has_timer: boolean;
    has_rating: boolean;
    user?: string;
    categoryId?: string;
    _id?: string;
}
