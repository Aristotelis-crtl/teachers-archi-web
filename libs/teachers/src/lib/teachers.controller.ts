import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Enseigne, Rules, Status, User as UserModel } from '@prisma/client';

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
    return this.teachersService.getCourse({ where: { id: { equals: id } } });
  }

  @Get('enseigne')
  public async getEnseignements() {
    return this.teachersService.getEnseignements({});
  }
  @Get('enseigne/:id')
  public async getEnseignementFromTeacher(@Param('id') id: string) {
    const userId = id.split('-')[0];
    const ueId = id.split('-')[1];
    return this.teachersService.getEnseignementFromTeacher({
      where: {
        userId: { equals: userId },
        uEId: { equals: ueId },
      },
    });
  }
  @Get('enseigne/all/:id')
  public async getAllEnseignementsFromTeacher(@Param('id') id: string) {
    return await this.teachersService.getAllEnseignementsFromTeacher({
      where: { id: { equals: id } },
    });
  }

  @Post('login')
  public async getUser(@Body() postData: loginProps) {
    const { username, password } = postData;
    return this.teachersService.getTeacher({
      where: { username: username },
    });
  }
  @Get(':id')
  public async getTeacher(@Param('id') id: string) {
    return this.teachersService.getTeacher({
      where: { id: id },
    });
  }
  @Get('/admin/rules')
  public async getRules() {
    return this.teachersService.getRules();
  }
  @Put('admin/rules/:id')
  public async updateRules(
    @Body() postData: Rules,
    @Param('id') id: string
  ): Promise<Rules> {
    return this.teachersService.updateRules({
      where: { id: id },
      data: postData,
    });
  }
  @Delete('remove/:id')
  public async removeTeacher(@Param('id') id: string) {
    return this.teachersService.removeTeacher(id);
  }
  @Delete('remove/enseignement/:id')
  public async removeEnseignement(@Param('id') id: string) {
    return this.teachersService.removeEnseignement(id);
  }

  @Post()
  public async createUser(@Body() postData: UserModel): Promise<UserModel> {
    const { firstName, lastName, username, password, status, minimumUC } =
      postData;
    return this.teachersService.createUser({
      firstName,
      lastName,
      username,
      password,
      status,
      minimumUC,
    });
  }
  @Put('update/:id')
  public async updateUser(
    @Body() postData: UserModel,
    @Param('id') id: string
  ): Promise<UserModel> {
    const { firstName, lastName, username, password, status, minimumUC } =
      postData;
    return this.teachersService.updateUser({
      where: { id: id },
      data: { firstName, lastName, username, password, status, minimumUC },
    });
  }
  @Post('enseigne')
  public async addEnseignement(
    @Body() postData: Enseigne & { status: Status }
  ): Promise<Enseigne> {
    const {
      heuresCM,
      heuresTD,
      heuresTP,
      groupesCM,
      groupesTD,
      groupesTP,
      userId,
      uEId,
      id,
      status,
    } = postData;
    return this.teachersService.addEnseignement({
      heuresCM,
      heuresTD,
      heuresTP,
      groupesCM,
      groupesTD,
      groupesTP,
      id,
      userId: userId,
      uEId: uEId,
      status: status,
    });
  }
}
