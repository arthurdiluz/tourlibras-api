import { Injectable } from '@nestjs/common';
import { ProfessorLessonRepository } from '../repositories/professor-lesson.repository';
import { CreateProfessorLessonDto } from '../dtos/create-professor-lesson.dto';
import { FindProfessorLessonDto } from '../dtos/find-professor-lesson.dto';
import { UpdateProfessorLessonDto } from '../dtos/update-professor-lesson.dto';

@Injectable()
export class ProfessorLessonService {
  constructor(
    private readonly professorLessonRepository: ProfessorLessonRepository,
  ) {}

  async create(professorId: number, body: CreateProfessorLessonDto) {
    return this.professorLessonRepository.create({
      data: {
        Professor: { connect: { id: professorId } },
        ...body,
      },
      include: { Professor: true },
    });
  }

  async find(professorId: number, { title, ...query }: FindProfessorLessonDto) {
    return this.professorLessonRepository.findMany({
      where: {
        professorId,
        title: { contains: title, mode: 'insensitive' },
        ...query,
      },
      include: { Professor: true, Students: true, Levels: true },
    });
  }

  async findById(id: number) {
    return this.professorLessonRepository.findUnique({
      where: { id },
      include: { Professor: true, Students: true, Levels: true },
    });
  }

  async update(id: number, body: UpdateProfessorLessonDto) {
    return await this.professorLessonRepository.update({
      where: { id },
      data: { ...body },
      include: { Professor: true, Students: true, Levels: true },
    });
  }

  async delete(id: number) {
    return this.professorLessonRepository.delete({
      where: { id },
      include: { Professor: true, Students: true, Levels: true },
    });
  }
}
