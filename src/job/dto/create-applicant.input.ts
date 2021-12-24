import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateApplicantInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => Int)
  age: number;
}
