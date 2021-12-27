import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@Entity({ abstract: true })
export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: number;

  @Field()
  @Property()
  createdAt: Date = new Date();

  @Field()
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
