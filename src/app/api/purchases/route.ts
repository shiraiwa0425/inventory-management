import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { createErrorResponse, createSuccessResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const purchases = await prisma.purchaseData.findMany({
      include: {
        vendor: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return createSuccessResponse(purchases);
  } catch (error) {
    return createErrorResponse(error, '仕入データの取得に失敗しました');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vendorId, purchaseDate, totalAmount, taxAmount, status, notes } = body;

    const purchase = await prisma.purchaseData.create({
      data: {
        vendorId: parseInt(vendorId),
        purchaseDate: new Date(purchaseDate),
        totalAmount: parseFloat(totalAmount),
        taxAmount: parseFloat(taxAmount),
        status: status || 'pending',
        notes,
      },
      include: {
        vendor: true,
      },
    });

    return createSuccessResponse(purchase, 201);
  } catch (error) {
    return createErrorResponse(error, '仕入データの作成に失敗しました');
  }
}