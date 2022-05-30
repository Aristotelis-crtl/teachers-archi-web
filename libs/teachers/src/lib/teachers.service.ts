import { Injectable } from '@nestjs/common';
import {
  Enseigne,
  Prisma,
  PrismaClient,
  Status,
  UE,
  User,
} from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TeachersService {
  public getTeachers(params: {
    where?: Prisma.UserWhereInput;
  }): Promise<User[]> {
    const { where } = params;
    return prisma.user.findMany({
      where,
      include: {
        Enseigne: { include: { ue: { select: { intitule: true } } } },
      },
    });
  }

  public getTeacher(params: { where?: Prisma.UserWhereInput }): Promise<User> {
    const { where } = params;
    return prisma.user.findFirst({
      where,
    });
  }
  public async removeTeacher(id: string): Promise<User> {
    const deleteEnseignement = prisma.enseigne.deleteMany({
      where: { userId: id },
    });
    const deleteUser = prisma.user.delete({ where: { id: id } });
    const transaction = await prisma.$transaction([
      deleteEnseignement,
      deleteUser,
    ]);

    return transaction[1];
  }
  public createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }
  public async addEnseignement(
    data: Enseigne & { status: Status }
  ): Promise<Enseigne> {
    const { id, status } = data;

    const heuresCM =
      (await this.getNombreHeure(
        status,
        data.heuresCM || 0,
        data.groupesCM || 0,
        'CM'
      )) || 0;
    const heuresTD =
      (await this.getNombreHeure(
        status,
        data.heuresTD || 0,
        data.groupesTD || 0,
        'TD'
      )) || 0;
    const heuresTP =
      (await this.getNombreHeure(
        status,
        data.heuresTP || 0,
        data.groupesTP || 0,
        'TP'
      )) || 0;
    return prisma.enseigne.upsert({
      where: { id: id || '624ac14b8c3d534157a5ca42' },
      update: {
        groupesCM: { increment: data.groupesCM || 0 },
        groupesTD: { increment: data.groupesTD || 0 },
        groupesTP: { increment: data.groupesTP || 0 },
        heuresCM: { increment: heuresCM || 0 },
        heuresTD: { increment: heuresTD || 0 },
        heuresTP: { increment: heuresTP || 0 },
      },
      create: {
        uEId: data.uEId,
        userId: data.userId,
        groupesCM: data.groupesCM || 0,
        groupesTD: data.groupesTD || 0,
        groupesTP: data.groupesTP || 0,
        heuresCM: heuresCM,
        heuresTD: heuresTD,
        heuresTP: heuresTP,
      },
    });
  }
  public async getNombreHeure(
    statusEnseignant: Status,
    nombreHeure: number,
    nombreGroupe: number,
    typeUe: 'CM' | 'TP' | 'TD'
  ): Promise<number> {
    const rules = await prisma.rules.findFirst();
    let res = 0;
    if (typeUe == 'TD' || typeUe === 'TP') {
      switch (typeUe) {
        case 'TD':
          statusEnseignant === 'ATER'
            ? (res = rules.aterRule * nombreHeure * nombreGroupe)
            : (res = nombreHeure * nombreGroupe * rules.td);
          break;
        case 'TP':
          statusEnseignant === 'ATER'
            ? (res = rules.aterRule * nombreHeure * nombreGroupe)
            : (res = nombreHeure * nombreGroupe * rules.tp);
          break;
      }
      return res;
    } else return rules.cm * nombreHeure * nombreGroupe;
  }
  public removeEnseignement(id: string): Promise<Enseigne> {
    return prisma.enseigne.delete({ where: { id: id } });
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

  public async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return await prisma.user.update({
      data,
      where,
    });
  }
}
