export interface Flashcard {
  id: number | null;
  question: string;
  answer: string;
  isBookmarked: boolean;
  isKnown: boolean;
  views: number | null;
}

export interface FlashcardCreateInput {
  question: string;
  answer: string;
  category: any;
}
