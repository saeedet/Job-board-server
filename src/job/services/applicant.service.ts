import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Applicant } from '../entities/applicant.entity';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(Applicant)
    private readonly repo: EntityRepository<Applicant>,
  ) {}

  // --------------------  Query --------------------//

  // Find all Applicants
  async findAllApplicants(): Promise<Applicant[]> {
    return await this.repo.findAll({ populate: ['jobs'] });
  }
}
