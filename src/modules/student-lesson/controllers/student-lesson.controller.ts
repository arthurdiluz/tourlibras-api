import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentLessonService } from '../services/student-lesson.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { StudentService } from 'src/modules/student/services/student.service';
import { ProfessorLessonService } from 'src/modules/professor-lesson/services/professor-lesson.service';
import { CreateStudentLessonDto } from '../dtos/create-student-lesson.dto';

@Controller('student')
export class StudentLessonController {
  constructor(
    private readonly studentLessonService: StudentLessonService,
    private readonly studentService: StudentService,
    private readonly lessonService: ProfessorLessonService,
  ) {}
  /*
    Ao entrar em uma aula, deveremos obter todas os exercisos da aula e as alternativas
    Ao final da aula, deve-se criar um registro em LessonLevelDone.
    Caso o aluno tenha passado na aula:
      - atualizar o registro de StudentOnLesson
      - atualizar dados do student com o que ganho da aula
      - relacionar medalha ao aluno 
  */
  // POST -> enviar resposta (alternativeId); validar se é a resposta correta; criar novo LessonLevelExerciseDone
  // GET -> listar alternativas

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/lesson/:lessonId')
  async create(
    @Param('id') studentId: number,
    @Param('lessonId') lessonId: number,
    @Body() body: CreateStudentLessonDto,
  ) {
    try {
      if (!(await this.studentService.findById(studentId))) {
        throw new BadRequestException(
          `Student with ID #${studentId} does not exists`,
        );
      }

      if (!(await this.lessonService.findById(lessonId))) {
        throw new BadRequestException(
          `Student with ID #${lessonId} does not exists`,
        );
      }

      return await this.studentLessonService.create(studentId, lessonId, body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
