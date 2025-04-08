import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// 全製品を取得
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error: unknown) {
    console.error('製品の取得中にエラーが発生しました:', error);
    return NextResponse.json({ error: 'エラーが発生しました' }, { status: 500 });
  }
}

// 新規製品を作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        quantity: parseInt(body.quantity),
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    console.error('製品の作成中にエラーが発生しました:', error);
    return NextResponse.json({ error: '製品の作成に失敗しました' }, { status: 500 });
  }
} 