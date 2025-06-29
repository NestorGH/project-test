import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma } from 'generated/prisma';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { EmployeeEntity } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  @ApiBody({ type: CreateEmployeeDto })
  @ApiCreatedResponse({ type: EmployeeEntity })
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @ApiQuery({ name: 'role', required: false })
  @ApiOkResponse({ type: EmployeeEntity, isArray: true })
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.employeeService.findAll(role);
  }

  @Get(':id')
  @ApiOkResponse({ type: EmployeeEntity })
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiOkResponse({ type: EmployeeEntity })
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: EmployeeEntity })
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
