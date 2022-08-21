import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import Logger from '../src/common/logger';

const prisma = new PrismaClient();
const password = bcrypt.hashSync('password', bcrypt.genSaltSync(10));

const userData: Prisma.UserCreateInput[] = [
  {
    firstname: 'Alice',
    lastname: 'Wonder',
    email: 'alice@prisma.io',
    password,
  },
  {
    firstname: 'Olumide',
    lastname: 'Nwosu',
    email: 'olumide@prisma.io',
    password,
  },
  {
    firstname: 'Michael',
    lastname: 'Jackson',
    email: 'mike@prisma.io',
    password,
  },
];

async function main() {
  Logger.info('Start seeding ...');
  for (let i = 0; i < userData.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const user = await prisma.user.create({
      data: userData[i],
    });
    Logger.info(`Created user with id: ${user.id}`);
  }
  Logger.info('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    Logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
