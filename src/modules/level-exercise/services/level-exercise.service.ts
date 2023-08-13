import { BadRequestException, Injectable } from '@nestjs/common';
import { LevelExerciseRepository } from '../repositories/level-exercise.repository';
import { CreateLevelExerciseDto } from '../dtos/exercise/create-level-exercise.dto';
import { FindLevelExerciseDto } from '../dtos/exercise/find-level-exercise.dto';
import { UpdateLevelExerciseDto } from '../dtos/exercise/update-level-exercise.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LevelExerciseService {
  constructor(private readonly exerciseRepository: LevelExerciseRepository) {}

  async create(
    levelId: number,
    { Alternatives, ...body }: CreateLevelExerciseDto,
  ) {
    const alternativesData = Alternatives.map(({ text, isCorrect }) => ({
      text,
      isCorrect,
    }));

    if (!this.isValidAlternatives(alternativesData)) {
      throw new BadRequestException('Invalid alternatives');
    }

    return this.exerciseRepository.create({
      data: {
        Level: { connect: { id: levelId } },
        Alternatives: {
          createMany: {
            skipDuplicates: false,
            data: alternativesData,
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

  async update(id: number, { Alternatives, ...body }: UpdateLevelExerciseDto) {
    let alternativesData:
      | Prisma.LessonLevelExerciseAlternativeUncheckedUpdateManyWithoutExerciseNestedInput
      | Prisma.LessonLevelExerciseAlternativeUpdateManyWithoutExerciseNestedInput =
      undefined;

    if (Alternatives) {
      alternativesData = {
        updateMany: {
          where: { exerciseId: 1 }, // TODO: update exercise id
          data: Alternatives.map(({ text, isCorrect }) => ({
            updatedAt: new Date(),
            text,
            isCorrect,
          })),
        },
      };

      if (
        !this.isValidAlternatives(
          Alternatives as Prisma.LessonLevelExerciseAlternativeCreateManyExerciseInput[],
        )
      ) {
        throw new BadRequestException('Invalid alternatives');
      }
    }

    return this.exerciseRepository.update({
      where: { id },
      data: {
        ...body,
        Alternatives: { ...alternativesData },
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

  async findAlternativeById(alternativeId: number) {
    return this.exerciseRepository.findAlternative({
      where: { id: alternativeId },
      include: { Exercise: true },
    });
  }

  private isValidAlternatives(
    alternatives: Prisma.LessonLevelExerciseAlternativeCreateManyExerciseInput[],
  ): boolean {
    if (alternatives.length !== 4) return false;

    const correctCount = alternatives.reduce((count, alternative) => {
      if (alternative.isCorrect) count++;
      return count;
    }, 0);

    return correctCount === 1;
  }
}
