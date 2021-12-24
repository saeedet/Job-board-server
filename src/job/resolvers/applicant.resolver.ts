import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateApplicantInput } from '../dto/applicant/create-applicant.input';
import { Applicant } from '../entities/applicant.entity';
import { ApplicantService } from '../services/applicant.service';

@Resolver(() => Applicant)
export class ApplicantResolver {
  constructor(private readonly applicantService: ApplicantService) {}

  // --------------------  Query --------------------//

  // Find all applicants
  @Query(() => [Applicant], { name: 'getApplicants' })
  findAll(): Promise<Applicant[]> {
    return this.applicantService.findAll();
  }

  // -------------------- Mutation -------------------//
  // Create new Applicant
  @Mutation(() => Applicant, { name: 'createApplicant' })
  create(@Args('input') input: CreateApplicantInput): Promise<Applicant> {
    return this.applicantService.create(input);
  }
}
