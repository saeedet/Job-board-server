import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JobService } from './job.service';
import { Job } from './entities/job.entity';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  // @Mutation(() => Job)
  // createJob(@Args('createJobInput') createJobInput: CreateJobInput) {
  //   return this.jobService.create(createJobInput);
  // }

  @Query(() => [Job], { name: 'job' })
  findAll() {
    return this.jobService.findAll();
  }

  // @Query(() => Job, { name: 'job' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.jobService.findOne(id);
  // }

  // @Mutation(() => Job)
  // updateJob(@Args('updateJobInput') updateJobInput: UpdateJobInput) {
  //   return this.jobService.update(updateJobInput.id, updateJobInput);
  // }

  // @Mutation(() => Job)
  // removeJob(@Args('id', { type: () => Int }) id: number) {
  //   return this.jobService.remove(id);
  // }
}
