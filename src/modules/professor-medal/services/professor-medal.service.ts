import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProfessorMedalRepository } from '../repositories/professor-medal.repository';
import { S3Service } from 'src/common/aws/services/aws.service';
import { CreateProfessorMedalDto } from '../dtos/create-professor-medal.dto';
import { FindProfessorMedalDto } from '../dtos/find-professor-medal.dto';
import { UpdateProfessorMedalDto } from '../dtos/update-professor-medal.dto';

@Injectable()
export class ProfessorMedalService {
  constructor(
    private readonly professorMedalRepository: ProfessorMedalRepository,
    private readonly s3Service: S3Service,
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

  async find(
    { name, description, ...query }: FindProfessorMedalDto,
    professorId: number,
  ) {
    return this.professorMedalRepository.findMany({
      where: {
        Professor: { id: professorId },
        name: { contains: name, mode: 'insensitive' },
        description: { contains: description, mode: 'insensitive' },
        ...query,
      },
      include: { Professor: true, Students: true, Lessons: true },
    });
  }

  async findById(professorMedalId: number) {
    return this.professorMedalRepository.findUnique({
      where: { id: professorMedalId },
      include: { Professor: true, Students: true, Lessons: true },
    });
  }

  async update(professorMedalId: number, body: UpdateProfessorMedalDto) {
    return this.professorMedalRepository.update({
      where: { id: professorMedalId },
      data: { ...body },
      include: { Professor: true, Students: true, Lessons: true },
    });
  }

  async delete(professorMedalId: number) {
    return this.professorMedalRepository.delete({
      where: { id: professorMedalId },
      include: { Professor: true, Students: true, Lessons: true },
    });
  }

  async uploadMedia(id: number, file: Express.Multer.File, path: string) {
    const key = await this.s3Service.upload(file, path);

    if (!key) {
      throw new InternalServerErrorException(`Could not upload file to AWS`);
    }

    await this.professorMedalRepository.update({
      where: { id },
      data: { media: key },
    });

    return key;
  }
}
