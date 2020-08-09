export interface Flashcard {
  user_id: number;
  question: string;
  answer: string;
  is_bookmarked: boolean;
  is_known: boolean;
  views: number;
}

export interface FlashcardFilters {
  is_bookmarked: number;
  is_known: number;
}
