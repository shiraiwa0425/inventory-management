import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { createErrorResponse, createSuccessResponse, ApiError } from '@/lib/api-response';

// 仕入先一覧の取得
export async function GET() {
  try {
    const vendors = await prisma.vendor.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return createSuccessResponse(vendors);
  } catch (error) {
    return createErrorResponse(error, '仕入先の取得に失敗しました');
  }
}

// 新規仕入先の作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, contact, taxId } = body;

    if (!name || !address || !contact || !taxId) {
      throw new ApiError('必要な情報が不足しています', 400);
    }

    const vendor = await prisma.vendor.create({
      data: {
        name,
        address,
        contact,
        taxId,
      },
    });

    return createSuccessResponse(vendor, 201);
  } catch (error) {
    return createErrorResponse(error, '仕入先の作成に失敗しました');
  }
} 