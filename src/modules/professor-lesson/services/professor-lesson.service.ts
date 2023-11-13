import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProfessorLessonRepository } from '../repositories/professor-lesson.repository';
import { CreateProfessorLessonDto } from '../dtos/create-professor-lesson.dto';
import { FindProfessorLessonDto } from '../dtos/find-professor-lesson.dto';
import { UpdateProfessorLessonDto } from '../dtos/update-professor-lesson.dto';
import { S3Service } from 'src/common/aws/services/aws.service';

@Injectable()
export class ProfessorLessonService {
  constructor(
    private readonly professorLessonRepository: ProfessorLessonRepository,
    private readonly s3Service: S3Service,
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

  async find(
    professorId: number,
    { title, medalId, ...query }: FindProfessorLessonDto,
  ) {
    return this.professorLessonRepository.findMany({
      where: {
        professorId,
        title: { contains: title, mode: 'insensitive' },
        Medal: medalId ? { id: medalId } : undefined,
        ...query,
      },
      include: { Professor: true, Students: true, Levels: true, Medal: true },
    });
  }

  async findById(id: number) {
    return this.professorLessonRepository.findUnique({
      where: { id },
      include: { Professor: true, Students: true, Levels: true, Medal: true },
    });
  }

  async update(id: number, { medalId, ...body }: UpdateProfessorLessonDto) {
    return await this.professorLessonRepository.update({
      where: { id },
      data: {
        Medal: medalId ? { update: { id: medalId } } : undefined,
        ...body,
      },
      include: { Professor: true, Students: true, Levels: true, Medal: true },
    });
  }

  async delete(id: number) {
    return this.professorLessonRepository.delete({
      where: { id },
      include: { Professor: true, Students: true, Levels: true, Medal: true },
    });
  }

  async uploadIcon(id: number, file: Express.Multer.File, path: string) {
    const key = await this.s3Service.upload(file, path);

    if (!key) {
      throw new InternalServerErrorException(`Could not upload file to AWS`);
    }

    await this.professorLessonRepository.update({
      where: { id },
      data: { icon: key },
    });

    return key;
  }
}
