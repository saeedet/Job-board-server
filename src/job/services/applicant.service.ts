import { wrap } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateApplicantInput } from '../dto/applicant/create-applicant.input';
import { UpdateApplicantInput } from '../dto/applicant/update-applicant.input';
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

  // Find one applicant populated with jobs
  async findOne(id: number): Promise<Applicant> {
    return await this.repo.findOne({ id }, ['jobs']);
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

  // Update Applicant
  async update(input: UpdateApplicantInput): Promise<Applicant> {
    const selectedApplicant: Applicant = await this.repo.findOne({
      id: input.id,
    });
    wrap(selectedApplicant).assign(input);
    await this.repo.persistAndFlush(selectedApplicant);
    return selectedApplicant;
  }

  // Delete an Applicant
  async remove(id: number): Promise<string> {
    const selectedApplicant: Applicant | null = await this.repo.findOne({ id });
    if (!selectedApplicant) {
      return `Applicant with id:${id} does not exist!`;
    }
    return 'Successfully deleted!';
  }
}
