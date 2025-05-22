import { Request } from 'express';

export interface RequestWithRefreshToken extends Request {
  refreshToken: string;
}