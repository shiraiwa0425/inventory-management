import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // ログインページは認証不要
  if (request.nextUrl.pathname === '/login') {
    if (token) {
      return NextResponse.redirect(new URL('/purchases', request.url));
    }
    return NextResponse.next();
  }

  // 認証が必要なページ
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/purchases/:path*',
    '/vendors/:path*',
    '/login',
  ],
}; 