import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    return NextResponse.json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch purchases' },
      { status: 500 }
    );
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

    return NextResponse.json(purchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    return NextResponse.json(
      { error: 'Failed to create purchase' },
      { status: 500 }
    );
  }
}