import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MyContext } from 'src/utils/interfaces/interfaces';
import { CreateApplicantInput } from '../dto/applicant/create-applicant.input';
import { UpdateApplicantInput } from '../dto/applicant/update-applicant.input';
import { Applicant } from '../entities/applicant.entity';
import { ApplicantService } from '../services/applicant.service';

@Resolver(() => Applicant)
export class ApplicantResolver {
  constructor(private readonly applicantService: ApplicantService) {}

  // --------------------  Query --------------------//

  // Find all applicants
  // @UseGuards(JwtAuthGuard)
  @Query(() => [Applicant], { name: 'getApplicants' })
  findAll(@Context() context: any): Promise<Applicant[]> {
    const auth = 'asd';
    console.log(context.randomValue);
    if (!auth) {
      return null;
    }
    return this.applicantService.findAll();
  }

  // Find an applicant populated with jobs
  @Query(() => Applicant, { name: 'getApplicant', nullable: true })
  findOne(@Args('id') id: number): Promise<Applicant | null> {
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
