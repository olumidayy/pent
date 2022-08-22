import {
  Apartment, Prisma, PrismaClient,
} from '@prisma/client';
import { ApiError, BaseService } from '../../common/index';
import prisma from '../../common/client';

class ApartmentService implements BaseService<Apartment> {
  prisma;

  constructor(client: PrismaClient) {
    this.prisma = client;
  }

  public async create(data: Prisma.ApartmentCreateInput): Promise<Apartment> {
    const apartment = await this.prisma.apartment.create({ data });
    return apartment;
  }

  /**
   * Fetches all apartments.
   * @param
   * @returns list of apartments
   */
  public async getAll(): Promise<Apartment[]> {
    const apartments = this.prisma.apartment.findMany();
    return apartments;
  }

  /**
   * Fetches one apartment by their ID.
   * @param id the apartment ID.
   * @returns a apartment or null.
   */
  public async getById(id: number): Promise<Apartment> {
    const apartment = await this.prisma.apartment.findUnique({
      where: { id },
      include: {
        reviews: {
          include: { rating: true, media: true },
        },
      },
    });
    if (!apartment) {
      throw new ApiError({ message: 'Apartment not found.', code: 404 });
    }
    return apartment;
  }

  /**
   * Fetches the reviews for an apartment.
   * @param id the apartment ID.
   * @returns a apartment or null.
   */
  public async getReviews(id: number): Promise<Apartment> {
    const apartment = await this.prisma.apartment.findUnique({
      where: { id },
      include: {
        reviews: {
          include: { rating: true, media: true },
        },
      },
    });
    if (!apartment) {
      throw new ApiError({ message: 'Apartment not found.', code: 404 });
    }
    return apartment;
  }

  public async update(id: number, data: Prisma.ApartmentUpdateInput): Promise<Apartment> {
    const apartment = await this.prisma.apartment.update({
      where: { id },
      data,
    });
    return apartment;
  }

  /**
   * Deletes one apartment by their ID.
   * @param id the apartment ID.
   * @returns
   */
  public async delete(id: number): Promise<void> {
    const apartment = await this.prisma.apartment.findUnique({
      where: { id },
    });
    if (!apartment) {
      throw new ApiError({ message: 'Apartment not found.', code: 404 });
    }
    await this.prisma.apartment.delete({
      where: { id },
    });
  }
}

export default new ApartmentService(prisma);
