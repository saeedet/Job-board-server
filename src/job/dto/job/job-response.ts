import { Field, ObjectType } from '@nestjs/graphql';
import { Job } from 'src/job/entities/job.entity';

@ObjectType()
export class JobResponse {
  @Field(() => Job, { nullable: true })
  job?: Job;

  @Field(() => String, { nullable: true })
  error?: string;
}
