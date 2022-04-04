import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { User as UserModel } from '@prisma/client';

interface loginProps {
  username: string;
  password: string;
}
@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Get()
  public async getUsers() {
    return this.teachersService.getTeachers({});
  }

  @Get('courses')
  public async getCourses() {
    return this.teachersService.getCourses({});
  }

  @Get('courses/:id')
  public async getCourse(@Param('id') id: string) {
    console.log('id', id);
    return this.teachersService.getCourse({ where: { id: { equals: id } } });
  }

  @Post('login')
  public async getUser(@Body() postData: loginProps) {
    const { username, password } = postData;
    return this.teachersService.getTeacher({
      where: { username: username },
    });
  }

  @Post()
  public async createUser(@Body() postData: UserModel): Promise<UserModel> {
    const { firstName, lastName, username, password, status } = postData;
    return this.teachersService.createUser({
      firstName,
      lastName,
      username,
      password,
      status,
    });
  }
}
