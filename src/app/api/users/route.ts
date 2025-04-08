import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

// 全ユーザーを取得
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(users);
  } catch (error: unknown) {
    console.error('ユーザーの取得中にエラーが発生しました:', error);
    return NextResponse.json({ error: 'エラーが発生しました' }, { status: 500 });
  }
}

// 新規ユーザーを作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // パスワードをハッシュ化
    const hashedPassword = await hash(body.password, 10);
    
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: body.role || 'user',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return NextResponse.json(user, { status: 201 });
  } catch (error: unknown) {
    console.error('ユーザーの作成中にエラーが発生しました:', error);
    return NextResponse.json({ error: 'ユーザーの作成に失敗しました' }, { status: 500 });
  }
} 