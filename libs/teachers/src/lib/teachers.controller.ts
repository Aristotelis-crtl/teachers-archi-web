import { Controller, Get, Post, Body } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import {User as UserModel} from '@prisma/client'
@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Get()
  public async getUsers() {
    return this.teachersService.getTeachers({});
  }

  @Post()
  public async createUser(
    @Body() postData: UserModel,
  ): Promise<UserModel> {
    console.log("here")
    const { firstName, lastName } = postData;
    return this.teachersService.createUser({
     firstName,
     lastName
    });
  }
}
