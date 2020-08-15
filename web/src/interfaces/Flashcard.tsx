export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  isBookmarked: boolean;
  isKnown: boolean;
  views: number;
}

export interface FlashcardCreateInput {
  question: string;
  answer: string;
  categoryId?: number;
}
