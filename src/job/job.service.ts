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
  // create(createJobInput: CreateJobInput) {
  //   return 'This action adds a new job';
  // }

  async findAllJobs(): Promise<Job[]> {
    return await this.repo.findAll({ populate: ['applicants'] });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} job`;
  // }

  // update(id: number, updateJobInput: UpdateJobInput) {
  //   return `This action updates a #${id} job`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} job`;
  // }
}
