import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateJobInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  date: string;

  @Field(() => String)
  location: string;
}
