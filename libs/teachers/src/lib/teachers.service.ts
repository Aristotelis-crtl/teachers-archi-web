import { Injectable } from '@nestjs/common';
import { Enseigne, Prisma, PrismaClient, UE, User } from '@prisma/client';

type ueProps = UE & {
  enseigne?: Enseigne[];
};

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
    return prisma.user.findFirst({
      where,
    });
  }
  public createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }
  public addEnseignement(data: Prisma.EnseigneCreateInput): Promise<Enseigne> {
    return prisma.enseigne.create({ data });
  }

  public async getCourses(params: {
    where?: Prisma.UEWhereInput;
  }): Promise<ueProps[]> {
    const { where } = params;
    return await prisma.uE.findMany({ where, include: { Enseigne: true } });
  }

  public getEnseignements(params: {
    where?: Prisma.UEWhereInput;
  }): Promise<UE[]> {
    const { where } = params;
    return prisma.uE.findMany({ where });
  }
  public getCourse(params: { where: Prisma.UEWhereInput }): Promise<UE> {
    const { where } = params;
    return prisma.uE.findFirst({ where, include: { Enseigne: true } });
  }

  public getEnseignementFromTeacher(params: {
    where: Prisma.EnseigneWhereInput;
  }): Promise<Enseigne> {
    const { where } = params;
    return prisma.enseigne.findFirst({ where });
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
