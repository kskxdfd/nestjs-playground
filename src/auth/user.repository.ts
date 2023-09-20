import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    return this.prisma.user.create({
      data: {
        username: username,
        password: hashPassword,
        status: status,
      },
    });
  }
}
