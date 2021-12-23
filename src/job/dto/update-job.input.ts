import { CreateJobInput } from './create-job.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateJobInput extends PartialType(CreateJobInput) {
  @Field(() => Int)
  id: number;
}
