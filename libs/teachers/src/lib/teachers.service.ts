import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TeachersService {
  public getTeachers(params: {
    where?: Prisma.UserWhereInput;
  }): Promise<User[]> {
    const { where } = params;
    return prisma.user.findMany({ where, include: { Enseigne: {} } });
  }

  public getTeacher(params: { where?: Prisma.UserWhereInput }): Promise<User> {
    const { where } = params;
    return prisma.user.findFirst({ where, include: { Enseigne: {} } });
  }
  public createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }
  /*  async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
      }): Promise<User> {
        const { where, data } = params;
        return prisma.user.update({
          data,
          where,
        });
      } */
}
