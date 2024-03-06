import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post()
  async create(
      @Body() createUserDto: CreateUserDto,
  ): Promise<UserModel> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.usersService.users({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.user({ id: Number(id) });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() userData: { email: string, password: string }): Promise<UserModel> {
    return this.usersService.update({ where: { id: Number(id) }, data: userData});
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.remove({ id: Number(id) });
  }
}
