import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JobService } from './job.service';
import { Job } from './entities/job.entity';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  // --------------------  Query --------------------//
  // Find all the jobs with applicants
  @Query(() => [Job])
  findAllJobs(): Promise<Job[]> {
    return this.jobService.findAllJobs();
  }

  // Find a single Job
  @Query(() => Job, { nullable: true })
  findOneJob(@Args('id') id: number): Promise<Job | null> {
    return this.jobService.findOneJob(id);
  }

  // -------------------- Mutation -------------------//
  // Create a new Job
  @Mutation(() => Job)
  createJob(@Args('input') input: CreateJobInput): Promise<Job> {
    return this.jobService.createJob(input);
  }

  // Update a job
  @Mutation(() => Job)
  updateJob(@Args('input') input: UpdateJobInput): Promise<Job> {
    return this.jobService.updateJob(input);
  }

  // Remove a single Job
  @Mutation(() => String)
  removeOneJob(@Args('id') id: number): Promise<string> {
    return this.jobService.removeOneJob(id);
  }
}
