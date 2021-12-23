import { Injectable } from '@nestjs/common';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';

@Injectable()
export class JobService {
  // create(createJobInput: CreateJobInput) {
  //   return 'This action adds a new job';
  // }

  findAll() {
    return `This action returns all job`;
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
