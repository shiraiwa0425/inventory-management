import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // テスト用の製品データを追加
  await prisma.product.createMany({
    data: [
      {
        name: 'テスト製品1',
        description: 'これはテスト製品1の説明です',
        price: 1000,
        quantity: 10,
        category: 'カテゴリ1',
        location: '倉庫A',
      },
      {
        name: 'テスト製品2',
        description: 'これはテスト製品2の説明です',
        price: 2000,
        quantity: 20,
        category: 'カテゴリ2',
        location: '倉庫B',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 