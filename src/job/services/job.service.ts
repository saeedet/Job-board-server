import { wrap } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { CreateApplicantInput } from '../dto/applicant/create-applicant.input';
import { CreateJobInput } from '../dto/job/create-job.input';
import { UpdateJobInput } from '../dto/job/update-job.input';
import { Applicant } from '../entities/applicant.entity';
import { Job } from '../entities/job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly repo: EntityRepository<Job>,
  ) {}

  // --------------------  Query --------------------//

  // Find all the jobs populated with applicants
  async findAll(): Promise<Job[]> {
    return await this.repo.findAll({ populate: ['applicants'] });
  }

  // Find a single Job
  async findOne(id: number): Promise<Job> {
    const job = await this.repo.findOne({ id }, ['applicants']);
    if (!job) {
      throw new GraphQLError(`Couldn't find job with id: ${id}`);
    }
    return job;
  }

  // -------------------- Mutation -------------------//

  // Create a new Job
  async create(input: CreateJobInput): Promise<Job> {
    const { title, description, date, location } = input;
    const newJob = new Job(title, description, date, location);
    await this.repo.persistAndFlush(newJob);
    return newJob;
  }

  // Create a new applicant for a job
  async createApplicant(
    jobId: number,
    applicant: CreateApplicantInput,
  ): Promise<Job> {
    const { firstName, lastName, email, age } = applicant;
    const newApplicant = new Applicant(firstName, lastName, email, age);
    const selectedJob: Job = await this.repo.findOne({ id: jobId });
    selectedJob.applicants.add(newApplicant);
    await this.repo.persistAndFlush(selectedJob);
    return selectedJob;
  }

  // Update a Job
  async update(input: UpdateJobInput): Promise<Job> {
    const { id } = input;
    const selectedJob: Job = await this.repo.findOne({ id }, ['applicants']);
    wrap(selectedJob).assign(input);
    await this.repo.persistAndFlush(selectedJob);
    return selectedJob;
  }

  // Delete a Job
  async remove(id: number): Promise<string> {
    try {
      const selectedJob: Job = await this.repo.findOneOrFail({ id });
      await this.repo.removeAndFlush(selectedJob);
      return 'Successfully deleted!';
    } catch (err) {
      return err.message;
    }
  }
}
