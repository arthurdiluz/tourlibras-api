import { Injectable } from '@nestjs/common';
import { StudentLessonRepository } from '../repositories/student-lesson.repository';
import { CreateStudentLessonDto } from '../dtos/create-student-lesson.dto';
import { FindStudentLessonDto } from '../dtos/find-student-lesson.dto';
import { UpdateStudentLessonDto } from '../dtos/update-student-lesson.dto';

@Injectable()
export class StudentLessonService {
  constructor(
    private readonly studentLessonRepository: StudentLessonRepository,
  ) {}

  async create(
    studentId: number,
    lessonId: number,
    body: CreateStudentLessonDto,
  ) {
    return await this.studentLessonRepository.create({
      data: {
        Student: { connect: { id: studentId } },
        Lesson: { connect: { id: lessonId } },
        ...body,
      },
      include: { Student: true, Lesson: true, DoneLevels: true },
    });
  }

  async find(studentId: number, lessonId: number, query: FindStudentLessonDto) {
    return this.studentLessonRepository.findMany({
      where: {
        Student: { id: studentId },
        Lesson: { id: lessonId },
        ...query,
      },
      include: { Student: true, Lesson: true, DoneLevels: true },
    });
  }

  async findById(id: number) {
    return this.studentLessonRepository.findUnique({
      where: { id },
      include: { Student: true, Lesson: true, DoneLevels: true },
    });
  }

  async findByRelationId(studentId: number, lessonId: number) {
    return this.studentLessonRepository.findUnique({
      where: { studentId_lessonId: { studentId, lessonId } },
      include: { Student: true, Lesson: true, DoneLevels: true },
    });
  }

  async findIdByRelation(studentId: number, lessonId: number) {
    const { id } = await this.studentLessonRepository.findUnique({
      where: { studentId_lessonId: { studentId, lessonId } },
    });

    return id;
  }

  async update(id: number, body: UpdateStudentLessonDto) {
    return this.studentLessonRepository.update({
      where: { id },
      data: { ...body },
      include: { Student: true, Lesson: true, DoneLevels: true },
    });
  }

  async delete(id: number) {
    return this.studentLessonRepository.delete({
      where: { id },
      include: { Student: true, Lesson: true, DoneLevels: true },
    });
  }
}
