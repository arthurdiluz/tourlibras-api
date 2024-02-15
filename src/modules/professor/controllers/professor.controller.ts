import {
  Controller,
  Body,
  NotFoundException,
  UseGuards,
  Get,
  Query,
  Param,
  Patch,
  HttpCode,
  HttpStatus,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { FindProfessorDto } from '../dtos/find-professor.dto';
import { UpdateProfessorDto } from '../dtos/update-professor.dto';
import { ProfessorService } from '../services/professor.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { LeaderboardDto } from '../dtos/leaderboard.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @UseGuards(JwtAccessTokenGuard)
  @Get()
  async find(@Query() query: FindProfessorDto) {
    return await this.professorService.find(query);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id')
  async findById(@Param('id') id: number) {
    const professor = await this.professorService.findById(id);

    if (!professor) {
      throw new NotFoundException(`Professor with ID "${id}" not found`);
    }

    return professor;
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/leaderboard')
  async leaderboard(@Param('id') id: number, @Query() query: LeaderboardDto) {
    if (!(await this.professorService.findById(id))) {
      throw new BadRequestException(`Professor with ID #${id} does not exists`);
    }

    return await this.professorService.leaderboard(id, query);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdateProfessorDto) {
    if (!(await this.professorService.findById(id))) {
      throw new NotFoundException(`Professor with ID "${id}" not found`);
    }

    return await this.professorService.update(id, body);
  }

  @UseGuards(JwtAccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.professorService.delete(id);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Delete(':id/student/:studentId')
  async removeStudent(
    @Param('id') id: number,
    @Param('studentId') studentId: number,
  ) {
    return await this.professorService.removeStudent(id, studentId);
  }
}
