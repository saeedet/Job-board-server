import { wrap } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';
import { Job } from './entities/job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly repo: EntityRepository<Job>,
  ) {}

  // --------------------  Query --------------------//
  // Find all the jobs with applicants
  async findAllJobs(): Promise<Job[]> {
    return await this.repo.findAll({ populate: ['applicants'] });
  }

  // Find a single Job
  async findOneJob(id: number): Promise<Job | null> {
    return await this.repo.findOne({ id }, ['applicants']);
  }

  // -------------------- Mutation -------------------//
  // Create a new Job
  async createJob(input: CreateJobInput): Promise<Job> {
    const newJob: Job = new Job(
      input.title,
      input.description,
      input.date,
      input.location,
    );
    await this.repo.persistAndFlush(newJob);
    return newJob;
  }

  // Update a Job
  async updateJob(input: UpdateJobInput): Promise<Job> {
    const selectedJob: Job = await this.repo.findOne({ id: input.id });
    wrap(selectedJob).assign(input);
    await this.repo.persistAndFlush(selectedJob);
    return selectedJob;
  }

  // Remove one Job
  async removeOneJob(id: number): Promise<string> {
    const selectedJob = await this.repo.findOne({ id });
    if (!selectedJob) {
      return `Job with id:${id} does not exist!`;
    }
    return 'Successfully deleted!';
  }

  // remove(id: number) {
  //   return `This action removes a #${id} job`;
  // }
}
