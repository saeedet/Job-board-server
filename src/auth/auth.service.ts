import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../utils/constants/constants';
import { User } from '../user/entities/user.entity';
import { Request, Response } from 'express';
import { LoginResponse } from '../utils/types/LoginResponse';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Login User
  async login(
    email: string,
    password: string,
    res: Response,
  ): Promise<LoginResponse> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new BadRequestException('Wrong username or password');
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      throw new BadRequestException('Wrong username or password');
    }

    // Login successful
    const accessToken = this.createAccessToken(user);
    const persistToken = this.createPersistToken(user);
    this.attachPersistToken(res, persistToken);
    return {
      accessToken,
      user,
    };
  }

  // Create Access Token for User
  createAccessToken(user: User): string {
    const { id } = user;
    return this.jwtService.sign(
      { userId: id },
      {
        expiresIn: jwtConstants.accessTokenExp,
        secret: jwtConstants.accessTokenSecret,
      },
    );
  }

  // Create Persist Token for User
  createPersistToken(user: User): string {
    const { id, tokenVersion } = user;
    return this.jwtService.sign(
      { userId: id, tokenVersion },
      {
        expiresIn: jwtConstants.persistTokenExp,
        secret: jwtConstants.persistTokenSecret,
      },
    );
  }

  // Attach Persist Token to response's cookie
  attachPersistToken(res: Response, token: string) {
    res.cookie('ptk', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/refresh_token',
    });
  }

  // Refresh and send User's Tokens
  async refreshToken(req: Request, res: Response) {
    const persistToken = req.cookies.ptk;
    if (!persistToken) {
      // There is no Persist Token
      return res.send({
        error: true,
        message: 'Unauthorized access! No persist token',
        accessToken: '',
      });
    }

    const payload = await this.jwtService.verify(persistToken, {
      secret: jwtConstants.persistTokenSecret,
    });

    if (!payload) {
      // Persist Token is not valid
      return res.send({
        error: true,
        message: 'Unauthorized access!',
        accessToken: '',
      });
    }

    // Persist Token is valid and we can send back fresh Tokens

    const user = await this.userService.findOneById(parseInt(payload.userId));
    if (!user) {
      // userId in token is not valid
      return res.send({
        error: true,
        message: 'User id is not valid!',
        accessToken: '',
      });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      // User access is revoked by admin
      return res.send({
        error: true,
        message: 'Unauthorized access!',
        accessToken: '',
      });
    }

    // All checks completed
    const freshPersistToken = this.createPersistToken(user);
    this.attachPersistToken(res, freshPersistToken);
    const freshAccessToken = this.createAccessToken(user);

    return res.send({
      error: false,
      message: '',
      accessToken: freshAccessToken,
    });
  }
}
