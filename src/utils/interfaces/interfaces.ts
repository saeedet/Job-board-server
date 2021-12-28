import { Request, Response } from 'express';

export interface LoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface MyContext {
  req: Request;
  res: Response;
}
