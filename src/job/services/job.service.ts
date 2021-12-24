import { wrap } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateApplicantInput } from '../dto/applicant/create-applicant.input';
import { CreateJobInput } from '../dto/job/create-job.input';
import { UpdateJobInput } from '../dto/job/update-job.input';
import { Applicant } from '../entities/applicant.entity';
import { Job } from '../entities/job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepo: EntityRepository<Job>,
    @InjectRepository(Applicant)
    private readonly applicantRepo: EntityRepository<Applicant>,
  ) {}

  // --------------------  Query --------------------//
  // Find all the jobs with applicants
  async findAll(): Promise<Job[]> {
    return await this.jobRepo.findAll({ populate: ['applicants'] });
  }

  // Find a single Job
  async findOne(id: number): Promise<Job | null> {
    return await this.jobRepo.findOne({ id }, ['applicants']);
  }

  // -------------------- Mutation -------------------//
  // Create a new Job
  async create(input: CreateJobInput): Promise<Job> {
    const newJob: Job = new Job(
      input.title,
      input.description,
      input.date,
      input.location,
    );
    await this.jobRepo.persistAndFlush(newJob);
    return newJob;
  }

  // Create a new applicant for a job
  async createApplicant(
    jobId: number,
    applicant: CreateApplicantInput,
  ): Promise<Job> {
    const newApplicant: Applicant = new Applicant(
      applicant.firstName,
      applicant.lastName,
      applicant.email,
      applicant.age,
    );
    const selectedJob: Job = await this.jobRepo.findOne({ id: jobId });
    selectedJob.applicants.add(newApplicant);
    await this.jobRepo.persistAndFlush(selectedJob);
    return selectedJob;
  }

  // Update a Job
  async update(input: UpdateJobInput): Promise<Job> {
    const selectedJob: Job = await this.jobRepo.findOne({ id: input.id }, [
      'applicants',
    ]);
    wrap(selectedJob).assign(input);
    await this.jobRepo.persistAndFlush(selectedJob);
    return selectedJob;
  }

  // Remove one Job
  async remove(id: number): Promise<string> {
    const selectedJob = await this.jobRepo.findOne({ id });
    if (!selectedJob) {
      return `Job with id:${id} does not exist!`;
    }
    return 'Successfully deleted!';
  }
}
