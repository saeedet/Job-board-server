import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './baseEntity';
import { Job } from './job.entity';

ObjectType();
Entity({ tableName: 'applicants' });
export class Applicant extends BaseEntity {
  @Field(() => String)
  @Property()
  firstName: string;

  @Field(() => String)
  @Property()
  lastName: string;

  @Field(() => Int)
  @Property()
  age: number;

  @Field(() => String)
  @Property()
  email: string;

  @Field(() => [Job])
  @ManyToMany(() => Job, (job) => job.applicants)
  jobs: Collection<Job> = new Collection<Job>(this);

  constructor(firstName: string, lastName: string, age: number, email: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
  }
}
