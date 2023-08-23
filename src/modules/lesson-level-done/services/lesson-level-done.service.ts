import { Injectable } from '@nestjs/common';
import { LessonLevelDoneRepository } from '../repositories/lesson-level-done.repository';
import { StudentLessonService } from 'src/modules/student-lesson/services/student-lesson.service';
import { LevelExerciseService } from 'src/modules/level-exercise/services/level-exercise.service';
import { CreateLessonLevelDoneDto } from '../dto/create-lesson-level-done.dto';
import { StudentService } from 'src/modules/student/services/student.service';

@Injectable()
export class LessonLevelDoneService {
  constructor(
    private readonly lessonLevelDoneRepository: LessonLevelDoneRepository,
    private readonly studentLessonService: StudentLessonService,
    private readonly exerciseService: LevelExerciseService,
    private readonly studentService: StudentService,
  ) {}

  async create(
    studentLessonId: number,
    exerciseId: number,
    { Answers }: CreateLessonLevelDoneDto,
  ) {
    const validateAttempt = () => {
      const trueCount = Answers.filter((answer) => answer).length;
      const totalCount = Answers.length;
      const threshold = totalCount * 0.7;
      return trueCount >= threshold;
    };

    const exercise = await this.exerciseService.findById(exerciseId);
    const isCorrectAttempt = validateAttempt();

    if (isCorrectAttempt) {
      const { studentId } = await this.studentLessonService.findById(
        studentLessonId,
      );
      const current = await this.studentService.findById(studentId);
      const { level, earnedXp, earnedMoney } = exercise['Level'];

      await this.studentService.update(studentId, {
        experience: current.experience + earnedXp,
        money: current.money + earnedMoney,
      });

      await this.studentLessonService.update(studentLessonId, {
        isCompleted: true,
        currentLevel: level + 1,
      });
    }

    return this.lessonLevelDoneRepository.create({
      data: {
        Student: { connect: { id: studentLessonId } },
        Exercise: { connect: { id: exerciseId } },
        isCorrectAttempt,
      },
      include: {
        Student: true,
        Exercise: { include: { Level: true, DoneExercises: true } },
      },
    });
  }
}
