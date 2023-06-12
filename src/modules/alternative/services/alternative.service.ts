import { Injectable } from '@nestjs/common';
import { AlternativeRepository } from '../repositories/alternative.repository';
import { CreateAlternativeDto } from '../dtos/create-alternative.dto';
import { FindAlternativeDto } from '../dtos/find-alternative.dto';

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
}
