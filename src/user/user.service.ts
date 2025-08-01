import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createUserDto: CreateUserDto) {

    const saltOrRounds = 12;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    try {
      return await this.databaseService.user.create({
        data: {
          name: createUserDto.name,
          password: hash,
          role: createUserDto.role
        },
      });
    } catch (error) {
      if (error) {
        throw new BadRequestException('Something went wrong while creating the user');
      }
    }
  }

  async findOneName(name: string): Promise<UserEntity> {
    const user = await this.databaseService.user.findFirst({
      where: { name }
    });
    if (!user) {
      throw new NotFoundException('User with the specified name does not exist.');
    }
    return user;
  }

  async findAll() {
    return await this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('The record with the specified ID does not exist or has been deleted.');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.databaseService.user.update({
        where: { id },
        data: {
          name: updateUserDto.name,
          password: updateUserDto.password,
          role: updateUserDto.role
        }
      });

    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('The record with the specified ID does not exist or has been deleted.');
      }
      throw error;
    }
  }

  async remove(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('The record with the specified ID does not exist or has been deleted.');
    }

    await this.databaseService.user.delete({
      where: { id },
    });
    return user;
  }
}
