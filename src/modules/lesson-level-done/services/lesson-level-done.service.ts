import { Injectable } from '@nestjs/common';
import { LessonLevelDoneRepository } from '../repositories/lesson-level-done.repository';
import { StudentLessonService } from 'src/modules/student-lesson/services/student-lesson.service';
import { CreateLessonLevelDoneDto } from '../dto/create-lesson-level-done.dto';
import { StudentService } from 'src/modules/student/services/student.service';
import { FindLessonLevelDoneDto } from '../dto/find-lesson-level-done.dto';
import { LessonLevelService } from 'src/modules/lesson-level/services/lesson-level.service';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

@Injectable()
export class LessonLevelDoneService {
  private include: Prisma.LessonLevelDoneInclude<DefaultArgs> = {
    Student: { include: { Student: { include: { Medals: true } } } },
    Level: {
      include: {
        Lesson: { include: { Levels: true, Medal: true, Professor: true } },
        LessonLevelExercises: true,
        LessonLevelDone: true,
      },
    },
  };

  constructor(
    private readonly lessonLevelDoneRepository: LessonLevelDoneRepository,
    private readonly studentLessonService: StudentLessonService,
    private readonly levelService: LessonLevelService,
    private readonly studentService: StudentService,
  ) {}

  async create(
    studentLessonId: number,
    lessonLevelId: number,
    { Answers }: CreateLessonLevelDoneDto,
  ) {
    const validateAttempt = () => {
      const trueCount = Answers.filter((answer) => !!answer).length;
      const totalCount = Answers.length;
      const threshold = totalCount * 0.7;
      return trueCount >= threshold;
    };

    const _level = await this.levelService.findById(lessonLevelId);
    const isCorrectAttempt = validateAttempt();

    if (isCorrectAttempt) {
      const { studentId } = await this.studentLessonService.findById(
        studentLessonId,
      );

      const current = await this.studentService.findById(studentId);
      const { level, earnedXp, earnedMoney } = _level;

      await this.studentService.update(studentId, {
        experience: current.experience + earnedXp,
        money: current.money + earnedMoney,
      });

      const { medalId } = (await this.levelService.findById(lessonLevelId))[
        'Lesson'
      ];

      if (medalId) await this.studentService.addMedal(studentId, medalId);

      await this.studentLessonService.update(studentLessonId, {
        isCompleted: true,
        currentLevel: level + 1,
      });
    }

    return this.lessonLevelDoneRepository.create({
      data: {
        Level: { connect: { id: lessonLevelId } },
        Student: { connect: { id: studentLessonId } },
        isCorrectAttempt,
      },
      include: this.include,
    });
  }

  async find(
    studentLessonId: number,
    levelId: number,
    query: FindLessonLevelDoneDto,
  ) {
    return this.lessonLevelDoneRepository.findMany({
      where: {
        Student: { id: studentLessonId },
        Level: { id: levelId },
        ...query,
      },
      include: this.include,
    });
  }

  async findById(id: number) {
    return this.lessonLevelDoneRepository.findUnique({
      where: { id },
      include: this.include,
    });
  }
}
