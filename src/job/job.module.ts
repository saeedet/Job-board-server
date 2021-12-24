import { Module } from '@nestjs/common';
import { JobService } from './services/job.service';
import { JobResolver } from './resolvers/job.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Job } from './entities/job.entity';
import { Applicant } from './entities/applicant.entity';
import { ApplicantResolver } from './resolvers/applicant.resolver';
import { ApplicantService } from './services/applicant.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Job, Applicant] })],
  providers: [JobResolver, ApplicantResolver, JobService, ApplicantService],
})
export class JobModule {}
