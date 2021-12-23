import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from './baseEntity';
import { Applicant } from './applicant.entity';

@ObjectType()
@Entity({ tableName: 'jobs' })
export class Job extends BaseEntity {
  @Field(() => String)
  @Property()
  title: string;

  @Field(() => String)
  @Property()
  description: string;

  @Field(() => String)
  @Property()
  date: string;

  @Field(() => String)
  @Property()
  location: string;

  @Field(() => [Applicant])
  @ManyToMany(() => Applicant, (applicant) => applicant.jobs, { owner: true })
  applicants: Collection<Applicant> = new Collection<Applicant>(this);

  constructor(
    title: string,
    description: string,
    date: string,
    location: string,
  ) {
    super();
    this.title = title;
    this.description = description;
    this.date = date;
    this.location = location;
  }
}
