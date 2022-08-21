import { Review, Prisma, PrismaClient } from '@prisma/client';
import { ApiError, BaseService } from '../../common/index';
import { NewReview } from './reviews.interfaces';
import prisma from '../../common/client';

class ReviewService implements BaseService<Review> {
  prisma;

  constructor(client: PrismaClient) {
    this.prisma = client;
  }

  /**
   * Creates a new review.
   * @param
   * @returns new review.
   */
  public async create(data: NewReview): Promise<Review> {
    const overallRating = Math.floor((data.landlord + data.environment + data.quality) / 3);
    const review = await this.prisma.review.create({
      data: {
        description: data.description,
        votes: 0,
        user: { connect: { id: data.userId } },
        apartment: { connect: { id: data.apartmentId } },
        media: {
          create: (data.media || []).map((url) => ({ url })),
        },
        rating: {
          create: {
            landlord: data.landlord,
            environment: data.environment,
            quality: data.quality,
            overall: overallRating,
          },
        },
      },
    });
    return review;
  }

  /**
   * Fetches all reviews.
   * @param
   * @returns list of reviews
   */
  public async getAll(): Promise<Review[]> {
    const Reviews = this.prisma.review.findMany();
    return Reviews;
  }

  /**
   * Fetches one review by their ID.
   * @param id the review ID.
   * @returns a review or null.
   */
  public async getById(id: number): Promise<Review> {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: { rating: true },
    });
    if (!review) {
      throw new ApiError({ message: 'Review not found.', code: 404 });
    }
    return review;
  }

  /**
   * Updates one review by their ID.
   * @param id the review ID.
   * @returns a review or null.
   */
  public async update(id: number, data: Prisma.ReviewUpdateInput): Promise<Review> {
    const review = await this.prisma.review.update({
      where: { id },
      data,
    });
    return review;
  }

  /**
   * Updates the number of votes for a review.
   * @param id the review ID.
   * @returns a review or null.
   */
  public async vote(id: number): Promise<Review> {
    const r = await this.prisma.review.findUnique({
      where: { id },
    });
    if (!r) {
      throw new ApiError({ message: "Review not found.", code: 404 });
    }
    const review = await this.prisma.review.update({
      where: { id },
      data: {
        votes: { increment: 1 },
      },
    });
    return review;
  }

  /**
   * Deletes one review by their ID.
   * @param id the review ID.
   * @returns
   */
  public async delete(id: number): Promise<void> {
    const review = await this.prisma.review.findUnique({
      where: { id }
    });
    if (!review) {
      throw new ApiError({ message: "Review not found.", code: 404 });
    }
    await this.prisma.rating.deleteMany({
      where: { reviewId: id }
    });
    await this.prisma.review.delete({
      where: { id },
    });
    // await Promise.all([ratings, reviews]);
  }
}

export default new ReviewService(prisma);
