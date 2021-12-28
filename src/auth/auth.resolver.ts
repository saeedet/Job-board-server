import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginResponse } from 'src/utils/types/LoginResponse';
import { MyContext } from 'src/utils/types/MyContext';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // Login user and generate access and persist tokens
  @Mutation(() => LoginResponse, { name: 'login' })
  login(
    @Args('input') input: LoginInput,
    @Context() ctx: MyContext,
  ): Promise<LoginResponse> {
    const { email, password } = input;
    return this.authService.login(email, password, ctx.res);
  }
}
