import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { createErrorResponse, createSuccessResponse } from '@/lib/api-response';

// 全仕入伝票を取得
export async function GET() {
  try {
    const purchaseOrders = await prisma.purchaseOrder.findMany({
      include: {
        items: true,
      },
      orderBy: {
        orderDate: 'desc',
      },
    });
    return createSuccessResponse(purchaseOrders);
  } catch (error) {
    return createErrorResponse(error, '仕入伝票の取得に失敗しました');
  }
}

// 新規仕入伝票を作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderNumber, supplier, orderDate, items } = body;

    const purchaseOrder = await prisma.purchaseOrder.create({
      data: {
        orderNumber,
        supplier,
        orderDate: new Date(orderDate),
        items: {
          create: items.map((item: { productName: string; quantity: string; unitPrice: string }) => ({
            productName: item.productName,
            quantity: parseInt(item.quantity),
            unitPrice: parseFloat(item.unitPrice),
            totalPrice: parseFloat(item.unitPrice) * parseInt(item.quantity),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return createSuccessResponse(purchaseOrder, 201);
  } catch (error) {
    return createErrorResponse(error, '仕入伝票の作成に失敗しました');
  }
} 