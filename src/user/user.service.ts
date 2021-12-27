import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';

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

  // Find a single User
  async findOne(id: number): Promise<User | null> {
    return await this.repo.findOne({ id });
  }

  // -------------------- Mutation -------------------//

  // Create new User
  async create(input: CreateUserInput): Promise<User> {
    const hashedPassword = await argon2.hash(input.password);
    const newUser = new User(
      input.firstName,
      input.lastName,
      input.email,
      hashedPassword,
    );
    await this.repo.persistAndFlush(newUser);
    return newUser;
  }
}
