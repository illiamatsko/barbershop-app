import { PrismaClient } from '@prisma/client';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const prisma = new PrismaClient();
const scrypt = promisify(_scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(8).toString('hex');
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  return salt + '.' + hash.toString('hex');
}

async function main() {
  const hashedPassword = await hashPassword('pa$$w0rd');

  await prisma.user.createMany({
    data: [
      {
        email: 'user@gmail.com',
        firstName: 'Petro',
        lastName: 'Test',
        phoneNumber: '',
        password: hashedPassword
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seed error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
