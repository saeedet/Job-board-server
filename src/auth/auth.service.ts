import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { LoginResponse } from 'src/utils/interfaces/interfaces';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate User
  async validateUser(
    email: string,
    password: string,
  ): Promise<LoginResponse | null> {
    const user = await this.userService.findOne(email);
    if (user) {
      const valid = await argon2.verify(user.password, password);
      if (valid) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, createdAt, updatedAt, ...result } = user;
        return result;
      }
    }
    return null;
  }

  // Login User
  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: jwtConstants.accessTokenExp,
        secret: jwtConstants.accessTokenSecret,
      }),
      persist_token: this.jwtService.sign(payload, {
        expiresIn: jwtConstants.persistTokenExp,
        secret: jwtConstants.persistTokenSecret,
      }),
    };
  }
}