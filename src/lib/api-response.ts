import { NextResponse } from 'next/server';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function createErrorResponse(
  error: unknown,
  defaultMessage: string = 'エラーが発生しました'
): NextResponse {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { error: defaultMessage },
    { status: 500 }
  );
}

export function createSuccessResponse<T>(
  data: T,
  statusCode: number = 200
): NextResponse {
  return NextResponse.json(data, { status: statusCode });
}