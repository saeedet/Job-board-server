import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from '../utils/types/LoginResponse';
import { MyContext } from '../utils/types/MyContext';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // Login user and generate access and persist tokens
  @Mutation(() => LoginResponse, { name: 'login' })
  login(
    @Args('input') input: LoginInput,
    @Context() { res }: MyContext,
  ): Promise<LoginResponse> {
    const { email, password } = input;
    return this.authService.login(email, password, res);
  }

  // Logout user
  @Mutation(() => Boolean, { name: 'logout' })
  logout(@Context() { res }: MyContext): boolean {
    this.authService.attachPersistToken(res, '');
    return true;
  }
}
