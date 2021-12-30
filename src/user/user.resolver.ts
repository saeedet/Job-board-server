import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtPayload } from 'src/utils/types/JwtPayload';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // --------------------  Query --------------------//

  // Find all users
  @Query(() => [User], { name: 'getUsers' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Find a single user by Email
  @Query(() => User, { nullable: true, name: 'getUser' })
  findOne(@Args('email') email: string): Promise<User | null> {
    return this.userService.findOne(email);
  }

  // Find user info
  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'whoAmI', nullable: true })
  me(@CurrentUser() user: JwtPayload) {
    return this.userService.findOneById(user.userId);
  }

  // -------------------- Mutation -------------------//

  // Create new User
  @Mutation(() => User, { name: 'createUser' })
  create(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }

  // Delete a user
  @Mutation(() => String, { name: 'deleteUser' })
  remove(@Args('id') id: number): Promise<string> {
    return this.userService.remove(id);
  }

  // Update a user
  @Mutation(() => User, { name: 'updateUser' })
  update(@Args('input') input: UpdateUserInput): Promise<User> {
    return this.userService.update(input);
  }
}
