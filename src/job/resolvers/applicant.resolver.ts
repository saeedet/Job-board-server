import { Query, Resolver } from '@nestjs/graphql';
import { Applicant } from '../entities/applicant.entity';
import { ApplicantService } from '../services/applicant.service';

@Resolver(() => Applicant)
export class ApplicantResolver {
  constructor(private readonly applicantService: ApplicantService) {}

  // --------------------  Query --------------------//

  // Find all applicants
  @Query(() => [Applicant])
  findAllApplicants(): Promise<Applicant[]> {
    return this.applicantService.findAllApplicants();
  }
}
