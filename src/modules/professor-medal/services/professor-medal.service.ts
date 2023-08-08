import { Injectable } from '@nestjs/common';
import { ProfessorMedalRepository } from '../repositories/professor-medal.repository';
import { ProfessorService } from 'src/modules/professor/services/professor.service';
import { CreateProfessorMedalDto } from '../dtos/create-professor-medal.dto';
import { FindProfessorMedalDto } from '../dtos/find-professor-medal.dto';

@Injectable()
export class ProfessorMedalService {
  constructor(
    private readonly professorMedalRepository: ProfessorMedalRepository,
    private readonly professorService: ProfessorService,
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
        name: { contains: name },
        description: { contains: description },
        ...query,
      },
      include: { Professor: true, Students: true, Lessons: true },
    });
  }

  async findById(professorMedalId: number) {
    return this.professorMedalRepository.findUnique({
      where: { id: professorMedalId },
    });
  }
}
