import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';
import type { ReviewInterface } from '@/interfaces/ReviewInterface.js';
import { useReviewStore } from '@/stores/reviewstore.js';

export class ReviewService {
  static getReviewsByBookId(bookId: number): ReviewInterface[] {
    return useReviewStore().reviews.filter((review) => review.bookId === bookId);
  }

  static createReview(review: CreateReviewDTO): ReviewInterface {
    const comment = review.comment.trim();
    const author = review.author?.trim();

    if (!comment) {
      throw new Error('Comment is required.');
    }

    if (!Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) {
      throw new Error('Rating must be between 1 and 5.');
    }

    const store = useReviewStore();

    const nextId =
      store.reviews.length > 0 ? Math.max(...store.reviews.map((item) => item.id)) + 1 : 1;

    const newReview: ReviewInterface = {
      id: nextId,
      bookId: review.bookId,
      rating: review.rating,
      comment,
      author: author || undefined,
      createdAt: new Date().toISOString(),
    };

    store.reviews.push(newReview);

    return newReview;
  }
}
