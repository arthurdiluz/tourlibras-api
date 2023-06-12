import { Injectable } from '@nestjs/common';
import { AlternativeRepository } from '../repositories/alternative.repository';
import { CreateAlternativeDto } from '../dtos/create-alternative.dto';
import { FindAlternativeDto } from '../dtos/find-alternative.dto';
import { UpdateAlternativeDto } from '../dtos/update-alternative.dto';

@Injectable()
export class AlternativeService {
  constructor(private readonly alternativeRepository: AlternativeRepository) {}

  async create({ exerciseId, ...body }: CreateAlternativeDto) {
    return this.alternativeRepository.create({
      data: {
        Exercise: { connect: { id: exerciseId } },
        ...body,
      },
    });
  }

  async find({ text, ...query }: FindAlternativeDto) {
    return this.alternativeRepository.findMany({
      where: {
        text: { contains: text, mode: 'insensitive' },
        ...query,
      },
    });
  }

  async findById(alternativeId: string) {
    return this.alternativeRepository.findUnique({
      where: { id: alternativeId },
    });
  }

  async update(
    alternativeId: string,
    { exerciseId, ...body }: UpdateAlternativeDto,
  ) {
    return this.alternativeRepository.update({
      where: { id: alternativeId },
      data: {
        Exercise: exerciseId ? { connect: { id: exerciseId } } : undefined,
        ...body,
      },
    });
  }

  async delete(alternativeId: string) {
    return this.alternativeRepository.delete({ where: { id: alternativeId } });
  }
}
