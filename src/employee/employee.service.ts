import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class EmployeeService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return await this.databaseService.employee.create({
      data: createEmployeeDto
    })
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) return await this.databaseService.employee.findMany({
      where: {
        role
      }
    })
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    return await this.databaseService.employee.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return await this.databaseService.employee.update({
      where: { id },
      data: updateEmployeeDto
    });
  }

  async remove(id: number) {
    return await this.databaseService.employee.delete({
      where: { id }
    })
  }
}
