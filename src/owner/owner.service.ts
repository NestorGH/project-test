import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class OwnerService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createOwnerDto: Prisma.OwnerCreateInput) {
    // Destructure pets from the DTO, rest goes to owner
    const { pets, ...ownerData } = createOwnerDto as any;

    return this.databaseService.owner.create({
      data: {
        ...ownerData,
        pets:
        {
          create: pets
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

  async update(id: number, updateOwnerDto: Prisma.OwnerUpdateInput & { pets?: { id: number, data: any }[] }) {
  const { pets, ...ownerData } = updateOwnerDto as any;

  return this.databaseService.owner.update({
    where: { id },
    data: {
      ...ownerData,
      ...(pets && pets.length
        ? {
            pets: {
              update: pets.map(pet => ({
                where: { id: pet.id },
                data: pet.data,
              })),
            },
          }
        : {}),
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
