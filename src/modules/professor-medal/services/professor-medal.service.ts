import { Injectable } from '@nestjs/common';
import { ProfessorMedalRepository } from '../repositories/professor-medal.repository';
import { CreateProfessorMedalDto } from '../dtos/create-professor-medal.dto';
import { FindProfessorMedalDto } from '../dtos/find-professor-medal.dto';
import { UpdateProfessorMedalDto } from '../dtos/update-professor-medal.dto';

@Injectable()
export class ProfessorMedalService {
  constructor(
    private readonly professorMedalRepository: ProfessorMedalRepository,
  ) {}

  async create(professorId: number, body: CreateProfessorMedalDto) {
    return this.professorMedalRepository.create({
      data: {
        Professor: { connect: { id: professorId } },
        ...body,
      },
      include: { Professor: true },
    });
  }

  async find({ name, description, ...query }: FindProfessorMedalDto) {
    return this.professorMedalRepository.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
        description: { contains: description, mode: 'insensitive' },
        ...query,
      },
      include: { Professor: true, Students: true, LessonLevels: true },
    });
  }

  async findById(professorMedalId: number) {
    return this.professorMedalRepository.findUnique({
      where: { id: professorMedalId },
      include: { Professor: true, Students: true, LessonLevels: true },
    });
  }

  async update(professorMedalId: number, body: UpdateProfessorMedalDto) {
    return this.professorMedalRepository.update({
      where: { id: professorMedalId },
      data: { ...body },
      include: { Professor: true, Students: true, LessonLevels: true },
    });
  }

  async delete(professorMedalId: number) {
    return this.professorMedalRepository.delete({
      where: { id: professorMedalId },
      include: { Professor: true, Students: true, LessonLevels: true },
    });
  }
}
