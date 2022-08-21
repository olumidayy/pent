import { PrismaClient, User } from '@prisma/client';
import { ApiError } from '../../common';
import prisma from '../../common/client';

class UserService {
  prisma;

  constructor(client: PrismaClient) {
    this.prisma = client;
  }

  /**
   * Fetches all users.
   * @param
   * @returns list of users
   */
  public async getAll(): Promise<User[]> {
    const users = this.prisma.user.findMany();
    return users;
  }

  /**
   * Fetches one user by their ID.
   * @param id the user ID.
   * @returns a user or null.
   */
  public async getById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new ApiError({ message: 'User not found.', code: 404 });
    }
    return user;
  }

  /**
   * Deletes one user by their ID.
   * @param id the user ID.
   * @returns
   */
  public async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}

export default new UserService(prisma);
