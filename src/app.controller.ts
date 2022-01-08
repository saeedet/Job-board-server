import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { Request as Req, Response as Res } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

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

  @Get('refresh_token')
  refreshToken(@Request() req: Req, @Response() res: Res) {
    return this.authService.refreshToken(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: Req) {
    return req.user;
  }
}
