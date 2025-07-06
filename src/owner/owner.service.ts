import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnerService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createOwnerDto: CreateOwnerDto) {
    return this.databaseService.owner.create({
      data: {
        name: createOwnerDto.name,
        email: createOwnerDto.email,
        pets: {
          create: createOwnerDto.pets.map(pet => ({
            name: pet.name,
            age: pet.age,
            species: pet.species,
            breed: pet.breed
          }))
        }
      },
    });
  }

  async findAll() {
    return this.databaseService.owner.findMany({
      include: { pets: true }
    });
  }

  async findOne(id: number) {
    return this.databaseService.owner.findUnique({
      where: { id },
      include: { pets: true }
    });
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return this.databaseService.owner.update({
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
  }

  async remove(id: number) { // Remove all pets associated (without Cascade delete)
    await this.databaseService.pet.deleteMany({
      where: { ownerId: id },
    });
    return this.databaseService.owner.delete({
      where: { id },
    });
  }
}
