import { CreateJobInput } from './create-job.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateJobInput extends PartialType(CreateJobInput) {
  @Field(() => String)
  id: string;
}
