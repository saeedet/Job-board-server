import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './../../utils/entities/baseEntity.entity';

@ObjectType()
@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Field(() => String)
  @Property()
  firstName: string;

  @Field(() => String)
  @Property()
  lastName: string;

  @Field(() => String)
  @Property({ unique: true })
  email: string;

  @Property()
  password: string;

  @Property({ default: 0 })
  tokenVersion: number;

  constructor(
    firstname: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    super();
    this.firstName = firstname;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
