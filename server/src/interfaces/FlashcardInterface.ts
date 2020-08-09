export interface Flashcard {
  id?: number;
  user_id: number;
  question: string;
  answer: string;
  is_bookmarked: boolean;
  is_known: boolean;
  views: number;
}

export interface UpdateFlashcard {
  question?: string;
  answer?: string;
  is_bookmarked?: boolean;
  is_known?: boolean;
}

export interface FlashcardFilters {
  is_bookmarked: number;
  is_known: number;
}
