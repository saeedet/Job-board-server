import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // --------------------  Query --------------------//

  // Find all users
  @Query(() => [User], { name: 'findAllUsers' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Find a single user
  @Query(() => User, { nullable: true, name: 'findUser' })
  findOne(@Args('id') id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  // -------------------- Mutation -------------------//

  // Create new User
  @Mutation(() => User, { name: 'createUser' })
  create(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }
}
