import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { prisma } from '@/lib/db';
import { createErrorResponse, createSuccessResponse, ApiError } from '@/lib/api-response';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// ログイン
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      throw new ApiError('ユーザー名とパスワードが必要です', 400);
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new ApiError('ユーザー名またはパスワードが正しくありません', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      throw new ApiError('ユーザー名またはパスワードが正しくありません', 401);
    }

    const token = sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return createSuccessResponse({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
    });
  } catch (error) {
    return createErrorResponse(error, 'ログイン中にエラーが発生しました');
  }
} 