import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

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
    return NextResponse.json(purchaseOrders);
  } catch (error: unknown) {
    console.error('仕入伝票の取得中にエラーが発生しました:', error);
    return NextResponse.json({ error: 'エラーが発生しました' }, { status: 500 });
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

    return NextResponse.json(purchaseOrder, { status: 201 });
  } catch (error: unknown) {
    console.error('仕入伝票の作成中にエラーが発生しました:', error);
    return NextResponse.json({ error: '仕入伝票の作成に失敗しました' }, { status: 500 });
  }
} 