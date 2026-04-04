/**
 * Application error classes with user-friendly messages.
 */

export class AppError extends Error {
  public statusCode: number;
  public userMessage: string;

  constructor(
    message: string,
    statusCode: number = 500,
    userMessage?: string
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.userMessage = userMessage || message;
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(
      `${resource} not found`,
      404,
      `The ${resource.toLowerCase()} you're looking for doesn't exist or you don't have access to it.`
    );
    this.name = 'NotFoundError';
  }
}

export class ForbiddenError extends AppError {
  constructor(action: string = 'perform this action') {
    super(
      `Forbidden: ${action}`,
      403,
      `You don't have permission to ${action}.`
    );
    this.name = 'ForbiddenError';
  }
}

export class ValidationError extends AppError {
  public fields: Record<string, string>;

  constructor(
    message: string,
    fields: Record<string, string> = {}
  ) {
    super(message, 400, message);
    this.name = 'ValidationError';
    this.fields = fields;
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, message);
    this.name = 'ConflictError';
  }
}

export class InsufficientCreditsError extends AppError {
  constructor() {
    super(
      'Insufficient credits',
      402,
      'You don\'t have enough credits to generate a pack. Please purchase more credits.'
    );
    this.name = 'InsufficientCreditsError';
  }
}

/**
 * Convert an unknown error to a user-friendly message.
 */
export function getUserMessage(err: unknown): string {
  if (err instanceof AppError) {
    return err.userMessage;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Convert an unknown error to an HTTP status code.
 */
export function getStatusCode(err: unknown): number {
  if (err instanceof AppError) {
    return err.statusCode;
  }
  return 500;
}
