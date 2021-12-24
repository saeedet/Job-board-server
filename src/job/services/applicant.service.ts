import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateApplicantInput } from '../dto/applicant/create-applicant.input';
import { Applicant } from '../entities/applicant.entity';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(Applicant)
    private readonly repo: EntityRepository<Applicant>,
  ) {}

  // --------------------  Query --------------------//

  // Find all Applicants
  async findAll(): Promise<Applicant[]> {
    return await this.repo.findAll({ populate: ['jobs'] });
  }

  // -------------------- Mutation -------------------//
  // Create new Applicant
  async create(input: CreateApplicantInput): Promise<Applicant> {
    const newApplicant: Applicant = new Applicant(
      input.firstName,
      input.lastName,
      input.email,
      input.age,
    );
    await this.repo.persistAndFlush(newApplicant);
    return newApplicant;
  }
}
