import { NextFunction, Request, Response } from 'express';

const TENANT_HEADER = 'x-api-key';

export function tenancyMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const header = req.headers[TENANT_HEADER] as string;
  req.apiKey = header?.toString() || null;
  next();
}
