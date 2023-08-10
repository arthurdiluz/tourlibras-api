import { BadRequestException, Injectable } from '@nestjs/common';
import { LevelExerciseRepository } from '../repositories/level-exercise.repository';
import { CreateLevelExerciseDto } from '../dtos/create-level-exercise.dto';
import { FindLevelExerciseDto } from '../dtos/find-level-exercise.dto';
import { UpdateLevelExerciseDto } from '../dtos/update-level-exercise.dto';

@Injectable()
export class LevelExerciseService {
  constructor(private readonly exerciseRepository: LevelExerciseRepository) {}

  async create(
    levelId: number,
    { Alternatives, ...body }: CreateLevelExerciseDto,
  ) {
    if (Alternatives.length !== 4) {
      throw new BadRequestException('An exercise must have 4 alternatives');
    }

    return this.exerciseRepository.create({
      data: {
        Level: { connect: { id: levelId } },
        Alternatives: {
          createMany: {
            skipDuplicates: false,
            data: Alternatives.map(({ text, isCorrect }) => ({
              text,
              isCorrect,
            })),
          },
        },
        ...body,
      },
      include: { Level: true, Alternatives: true },
    });
  }

  async find(levelId: number, query: FindLevelExerciseDto) {
    const { statement, media, text, isCorrect } = query;

    return this.exerciseRepository.findMany({
      where: {
        Level: { id: levelId },
        media,
        statement: { contains: statement, mode: 'insensitive' },
        Alternatives: {
          some: {
            text: { contains: text, mode: 'insensitive' },
            isCorrect: { equals: isCorrect },
          },
        },
      },
      include: { Level: true, Alternatives: true },
    });
  }

  async findById(id: number) {
    return this.exerciseRepository.findUnique({
      where: { id },
      include: { Level: true, Alternatives: true },
    });
  }

  async update(id: number, { Alternative, ...body }: UpdateLevelExerciseDto) {
    const Alternatives = undefined;

    if (Alternative) {
      const { alternativeId, ...alternativeBody } = Alternative;
      Alternatives['update'] = {
        where: { id: alternativeId },
        data: { ...alternativeBody },
      };
    }

    return this.exerciseRepository.update({
      where: { id },
      data: {
        ...body,
        Alternatives,
      },
      include: { Level: true, Alternatives: true },
    });
  }

  async delete(id: number) {
    return this.exerciseRepository.delete({
      where: { id },
      include: { Level: true, Alternatives: true },
    });
  }
}
