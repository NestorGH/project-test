import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
