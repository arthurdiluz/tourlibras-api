import { Injectable } from '@nestjs/common';
import { ProfessorLessonRepository } from '../repositories/professor-lesson.repository';
import { CreateProfessorLessonDto } from '../dtos/create-professor-lesson.dto';

@Injectable()
export class ProfessorLessonService {
  constructor(
    private readonly professorLessonRepository: ProfessorLessonRepository,
  ) {}

  async create(
    professorId: number,
    { medalId, ...body }: CreateProfessorLessonDto,
  ) {
    return this.professorLessonRepository.create({
      data: {
        Professor: { connect: { id: professorId } },
        Medal: medalId ? { connect: { id: medalId } } : undefined,
        ...body,
      },
      include: { Professor: true, Medal: true },
    });
  }
}
