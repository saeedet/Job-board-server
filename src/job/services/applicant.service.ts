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
  async findOne(id: number): Promise<Applicant | null> {
    return await this.repo.findOne({ id }, ['jobs']);
  }

  // -------------------- Mutation -------------------//

  // Create new Applicant
  async create(input: CreateApplicantInput): Promise<Applicant> {
    const { firstName, lastName, email, age } = input;
    // Check for email uniqueness
    const exist = await this.repo.count({ email });
    if (exist > 0) {
      throw new Error(`User with email:${email} already exists!`);
    }
    const newApplicant = new Applicant(firstName, lastName, email, age);
    await this.repo.persistAndFlush(newApplicant);
    return newApplicant;
  }

  // Update Applicant
  async update(input: UpdateApplicantInput): Promise<Applicant> {
    const { id, email } = input;
    // Check for email uniqueness
    if (email) {
      const exist = await this.repo.count({ email });
      if (exist > 0) {
        throw new Error(`Applicant with email:${email} already exists!`);
      }
    }
    const selectedApplicant = await this.repo.findOne({ id });
    wrap(selectedApplicant).assign(input);
    await this.repo.persistAndFlush(selectedApplicant);
    return selectedApplicant;
  }

  // Delete an Applicant
  async remove(id: number): Promise<string> {
    const selectedApplicant = await this.repo.findOne({ id });
    if (!selectedApplicant) {
      throw new Error(`Applicant with id:${id} does not exist!`);
    }
    await this.repo.removeAndFlush(selectedApplicant);
    return 'Successfully deleted!';
  }
}
