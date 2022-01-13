import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JobService } from '../services/job.service';
import { Job } from '../entities/job.entity';
import { CreateJobInput } from '../dto/job/create-job.input';
import { UpdateJobInput } from '../dto/job/update-job.input';
import { CreateApplicantInput } from '../dto/applicant/create-applicant.input';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  // --------------------  Query --------------------//

  // Find all the jobs populated with applicants
  @Query(() => [Job], { name: 'getJobs' })
  findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  // Find a single Job
  @Query(() => Job, { nullable: true, name: 'getJob' })
  findOne(@Args('id', ParseIntPipe) id: number): Promise<Job> {
    return this.jobService.findOne(id);
  }

  // -------------------- Mutation -------------------//

  // Create a new Job
  @Mutation(() => Job, { name: 'createJob' })
  create(@Args('input') input: CreateJobInput): Promise<Job> {
    return this.jobService.create(input);
  }

  // Create a new applicant for a job
  @Mutation(() => Job, { name: 'createApplicantforJob' })
  createApplicant(
    @Args('jobId', ParseIntPipe) jobId: number,
    @Args('applicant') applicant: CreateApplicantInput,
  ): Promise<Job> {
    return this.jobService.createApplicant(jobId, applicant);
  }

  // Update a job
  @Mutation(() => Job, { name: 'updateJob' })
  update(@Args('input') input: UpdateJobInput): Promise<Job> {
    return this.jobService.update(input);
  }

  // Delete a single Job
  @Mutation(() => String, { name: 'deleteJob' })
  remove(@Args('id', ParseIntPipe) id: number): Promise<string> {
    return this.jobService.remove(id);
  }
}
