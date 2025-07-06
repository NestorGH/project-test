import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Prisma } from 'generated/prisma';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { OwnerEntity } from './entities/owner.entity';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) { }

  @Post()
  @ApiBody({ type: CreateOwnerDto })
  @ApiCreatedResponse({ type: OwnerEntity })
  create(@Body() createOwnerDto: Prisma.OwnerCreateInput) {
    return this.ownerService.create(createOwnerDto);
  }

  @Get()
  @ApiOkResponse({ type: OwnerEntity, isArray: true })
  findAll() {
    return this.ownerService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: OwnerEntity })
  findOne(@Param('id') id: string) {
    return this.ownerService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateOwnerDto})
  @ApiOkResponse({ type: OwnerEntity })
  update(@Param('id') id: string, @Body() updateOwnerDto: Prisma.OwnerUpdateInput & { pets?: { id: number, data: any }[] }) {
    return this.ownerService.update(+id, updateOwnerDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OwnerEntity})
  remove(@Param('id') id: string) {
    return this.ownerService.remove(+id);
  }
}
