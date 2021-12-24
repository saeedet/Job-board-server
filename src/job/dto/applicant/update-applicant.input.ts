import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { CreateApplicantInput } from './create-applicant.input';

@InputType()
export class UpdateApplicantInput extends PartialType(CreateApplicantInput) {
  @Field(() => Int)
  id: number;
}
