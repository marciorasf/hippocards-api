export interface Flashcard {
  id?: number;
  question: string;
  answer: string;
  isBookmarked: boolean;
  isKnown: boolean;
  views: number;
  userId: number;
}

export interface FlashcardUpdate {
  question?: string;
  answer?: string;
  isBookmarked?: boolean;
  isKnown?: boolean;
}

export interface FlashcardFilters {
  isBookmarked: boolean;
  isKnown: boolean;
}
