import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateApplicantInput } from '../dto/applicant/create-applicant.input';
import { UpdateApplicantInput } from '../dto/applicant/update-applicant.input';
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

  // Find an applicant populated with jobs
  @Query(() => Applicant, { name: 'getApplicant' })
  findOne(@Args('id') id: number): Promise<Applicant> {
    return this.applicantService.findOne(id);
  }

  // -------------------- Mutation -------------------//

  // Create new Applicant
  @Mutation(() => Applicant, { name: 'createApplicant' })
  create(@Args('input') input: CreateApplicantInput): Promise<Applicant> {
    return this.applicantService.create(input);
  }

  // Update Applicant
  @Mutation(() => Applicant, { name: 'updateApplicant' })
  update(@Args('input') input: UpdateApplicantInput): Promise<Applicant> {
    return this.applicantService.update(input);
  }

  // Delete a single Applicant
  @Mutation(() => String, { name: 'deleteApplicant' })
  remove(@Args('id') id: number): Promise<string> {
    return this.applicantService.remove(id);
  }
}
