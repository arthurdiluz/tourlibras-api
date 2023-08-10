import { BadRequestException, Injectable } from '@nestjs/common';
import { LevelExerciseRepository } from '../repositories/level-exercise.repository';
import { CreateLevelExerciseDto } from '../dtos/create-level-exercise.dto';

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
}
