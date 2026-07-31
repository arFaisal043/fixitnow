import { PrismaClient, BookingStatus } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.booking.update({
    where: { id: 'a21cd70d-e02b-4523-bcef-4884f79ec313' },
    data: { status: BookingStatus.ACCEPTED },
  });
  console.log('Booking successfully set to ACCEPTED!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
