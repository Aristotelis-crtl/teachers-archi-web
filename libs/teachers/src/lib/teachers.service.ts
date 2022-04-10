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
  public addEnseignement(data: Enseigne): Promise<Enseigne> {
    const { id } = data;
    delete data.id;
    return prisma.enseigne.upsert({
      where: { id: id || '624ac14b8c3d534157a5ca42' },
      update: {
        groupesCM: { increment: data.groupesCM || 0 },
        groupesTD: { increment: data.groupesTD || 0 },
        groupesTP: { increment: data.groupesTP || 0 },
        heuresCM: { increment: data.heuresCM || 0 },
        heuresTD: { increment: data.heuresTD || 0 },
        heuresTP: { increment: data.heuresTP || 0 },
      },
      create: { ...data },
    });
  }

  public async getCourses(params: { where?: Prisma.UEWhereInput }) {
    const { where } = params;
    return await prisma.uE.findMany({
      where,
      include: {
        Enseigne: true,
      },
      /*       include: {Enseigne: {include: {user: {select: {firstName: true}}}}}
       */
    });
  }

  public getEnseignements(params: {
    where?: Prisma.UEWhereInput;
  }): Promise<UE[]> {
    const { where } = params;
    return prisma.uE.findMany({ where });
  }

  public async getAllEnseignementsFromTeacher(params: {
    where?: Prisma.UserWhereInput;
  }): Promise<
    User & {
      Enseigne: (Enseigne & {
        ue: {
          intitule: string;
        };
      })[];
    }
  > {
    const { where } = params;
    return await prisma.user.findFirst({
      where,
      include: {
        Enseigne: { include: { ue: { select: { intitule: true } } } },
      },
    });
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
