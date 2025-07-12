import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnerService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createOwnerDto: CreateOwnerDto) {
    try {
      return await this.databaseService.owner.create({
        data: {
          name: createOwnerDto.name,
          email: createOwnerDto.email,
          pets: {
            create: createOwnerDto.pets.map(pet => ({
              name: pet.name,
              age: pet.age,
              species: pet.species,
              breed: pet.breed
            })) || [],
          }
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('The email already exists')
        }
      }
      throw error
    }
  }

  async findAll() {
    return await this.databaseService.owner.findMany({
      include: { pets: true }
    });
  }

  async findOne(id: number) {
    const owner = await this.databaseService.owner.findUnique({
      where: { id },
      include: { pets: true }
    });
    if (!owner) {
      throw new NotFoundException('The record with the specified ID does not exist or has been deleted.');
    }
    return owner;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    try {
      return await this.databaseService.owner.update({
        where: { id },
        data: {
          name: updateOwnerDto.name,
          email: updateOwnerDto.email,
          pets: {
            update: updateOwnerDto.pets?.map(pet => ({
              where: { id: pet.id },
              data: {
                name: pet.name,
                age: pet.age,
                species: pet.species,
                breed: pet.breed
              }
            })) || [],
          }
        },
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
    const owner = await this.databaseService.owner.findUnique({
      where: { id },
      include: { pets: true }
    });

    if (!owner) {
      throw new NotFoundException('The record with the specified ID does not exist or has been deleted.');
    }

    await this.databaseService.pet.deleteMany({
      where: { ownerId: id },
    });
    await this.databaseService.owner.delete({
      where: { id },
    });

    return owner; // Return the deleted owner with pets
  }
}
