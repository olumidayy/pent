import * as bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@prisma/client';
import { sign, SignOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import { LoginDTO } from './auth.interfaces';
import { ApiError } from '../../common';
import config from '../../config';
import prisma from '../../common/client';

class AuthService {
  prisma;

  constructor(client: PrismaClient) {
    this.prisma = client;
  }

  /**
   * Registers a new user, hashes their password and adds
   * their details to the database.
   * @param data - an interface with firstname, lastname, email
   * and password fields.
   * @returns - null
   */
  public async Register(data: Prisma.UserCreateInput) {
    const user: any = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (user) {
      throw new ApiError({
        message: 'User already exists.',
        code: 400,
      });
    }
    const hashedPassword = await bcrypt.hash(data.password, config.saltRounds);
    await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  /**
   * Takes in user details and logs them in if their account exists
   * @param data - an interface with email password fields.
   * @returns - an object containing the @param `userData` and a token
   */
  public async Login(data: LoginDTO) {
    const user: any = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new ApiError({ message: 'User does not exist.' });
    }
    const match = await bcrypt.compare(data.password, user.password);
    if (!match) {
      throw new ApiError({ message: 'Invalid credentials.', code: 401 });
    }
    delete user.password;
    return { user, token: AuthService.tokenize(user) };
  }

  /**
   * @param payload - an object which houses the user's
   *  information.
   * @returns - a token
   */
  private static tokenize(payload: any) {
    const privateKey = {
      key: fs.readFileSync(path.join(__dirname, '../../../private.pem'), 'utf-8'),
      passphrase: config.jwt_passphrase,
    };

    const signInOptions: SignOptions = {
      algorithm: 'RS256',
      expiresIn: '2h',
    };

    return sign(payload, privateKey, signInOptions);
  }
}

export default new AuthService(prisma);
