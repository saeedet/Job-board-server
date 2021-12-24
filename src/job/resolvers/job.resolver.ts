import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JobService } from '../services/job.service';
import { Job } from '../entities/job.entity';
import { CreateJobInput } from '../dto/job/create-job.input';
import { UpdateJobInput } from '../dto/job/update-job.input';
import { Applicant } from '../entities/applicant.entity';
import { CreateApplicantInput } from '../dto/applicant/create-applicant.input';

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

  // Create new Applicant
  @Mutation(() => Applicant)
  createApplicant(
    @Args('input') input: CreateApplicantInput,
  ): Promise<Applicant> {
    return this.jobService.createApplicant(input);
  }

  // Create a new applicant for a job
  @Mutation(() => Job)
  createApplicantforJob(
    @Args('jobId') jobId: number,
    @Args('applicant') applicant: CreateApplicantInput,
  ): Promise<Job> {
    return this.jobService.createApplicantforJob(jobId, applicant);
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
