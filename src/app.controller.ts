import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: Req) {
    return this.authService.login(req.user);
  }
  // async login(@Request() req: Req) {
  //   return req.user;
  // }
}
