import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// 仕入先一覧の取得
export async function GET() {
  try {
    const vendors = await prisma.vendor.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(vendors);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json(
      { error: '仕入先の取得に失敗しました' },
      { status: 500 }
    );
  }
}

// 新規仕入先の作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, contact, taxId } = body;

    if (!name || !address || !contact || !taxId) {
      return NextResponse.json(
        { error: '必要な情報が不足しています' },
        { status: 400 }
      );
    }

    const vendor = await prisma.vendor.create({
      data: {
        name,
        address,
        contact,
        taxId,
      },
    });

    return NextResponse.json(vendor, { status: 201 });
  } catch (error) {
    console.error('Error creating vendor:', error);
    return NextResponse.json(
      { error: '仕入先の作成に失敗しました' },
      { status: 500 }
    );
  }
} 