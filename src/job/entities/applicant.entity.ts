import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './../../utils/entities/baseEntity.entity';
import { Job } from './job.entity';

@ObjectType()
@Entity({ tableName: 'applicants' })
export class Applicant extends BaseEntity {
  @Field(() => String)
  @Property()
  firstName: string;

  @Field(() => String)
  @Property()
  lastName: string;

  @Field(() => String)
  @Property({ unique: true })
  email: string;

  @Field(() => Int)
  @Property()
  age: number;

  @Field(() => [Job])
  @ManyToMany(() => Job, (job) => job.applicants)
  jobs: Collection<Job> = new Collection<Job>(this);

  constructor(firstName: string, lastName: string, email: string, age: number) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.age = age;
  }
}
