import { Injectable } from '@nestjs/common';
import { AlternativeRepository } from '../repositories/alternative.repository';
import { CreateAlternativeDto } from '../dtos/create-alternative.dto';

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
}
