import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field(() => String)
  accessToken: string;
}
