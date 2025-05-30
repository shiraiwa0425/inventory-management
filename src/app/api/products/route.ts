import { prisma } from '@/lib/db';
import { createErrorResponse, createSuccessResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return createSuccessResponse(products);
  } catch (error) {
    return createErrorResponse(error, '製品データの取得に失敗しました');
  }
} 