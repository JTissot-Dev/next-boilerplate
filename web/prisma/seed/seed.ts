import { PrismaClient } from '@prisma/client';
import users from './seed-data/users';
import accounts from './seed-data/accounts';

const prisma = new PrismaClient();

export async function main() {
  await prisma.verification.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log('🌱 Début du seeding...');

  console.log('👤 Création des utilisateurs...');
  for (const user of users) {
    await prisma.user.create({
      data: user
    });
    console.log(`✅ Utilisateur créé: ${user.name} (${user.email})`);
  }

  console.log('🔐 Création des comptes...');
  for (const account of accounts) {
    await prisma.account.create({
      data: account
    });
    console.log(`✅ Compte créé: ${account.providerId} pour userId ${account.userId}`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
