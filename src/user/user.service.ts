import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { UpdateUserInput } from './dto/update-user.input';
import { wrap } from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: EntityRepository<User>,
  ) {}

  // --------------------  Query --------------------//

  // Find all Users
  async findAll(): Promise<User[]> {
    return await this.repo.findAll();
  }

  // Find a single User by Email
  async findOne(email: string): Promise<User | null> {
    return await this.repo.findOne({ email });
  }

  // Find a single user by ID
  async findOneById(id: number): Promise<User | null> {
    return await this.repo.findOne({ id });
  }

  // -------------------- Mutation -------------------//

  // Create new User
  async create(input: CreateUserInput): Promise<User> {
    const { firstName, lastName, email, password } = input;
    // Check for email uniqueness
    const exist = await this.repo.count({ email });
    if (exist > 0) {
      throw new Error(`User with email:${email} already exists!`);
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new User(firstName, lastName, email, hashedPassword);
    await this.repo.persistAndFlush(newUser);
    return newUser;
  }

  // Delete a User
  async remove(id: number): Promise<string> {
    const selectedUser = await this.repo.findOne({ id });
    if (!selectedUser) {
      throw new Error(`User with id:${id} does not exist!`);
    }
    await this.repo.removeAndFlush(selectedUser);
    return 'Successfully deleted!';
  }

  // Update a user
  async update(input: UpdateUserInput): Promise<User> {
    const { id, email } = input;
    // Check for email uniqueness
    if (email) {
      const exist = await this.repo.count({ email });
      if (exist > 0) {
        throw new Error(`User with email:${email} already exists!`);
      }
    }
    const selectedUser = await this.repo.findOne({ id });
    wrap(selectedUser).assign(input);
    await this.repo.persistAndFlush(selectedUser);
    return selectedUser;
  }
}
