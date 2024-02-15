import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfessorMedalService } from '../services/professor-medal.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateProfessorMedalDto } from '../dtos/create-professor-medal.dto';
import { ProfessorService } from 'src/modules/professor/services/professor.service';
import { FindProfessorMedalDto } from '../dtos/find-professor-medal.dto';
import { UpdateProfessorMedalDto } from '../dtos/update-professor-medal.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('professor')
export class ProfessorMedalController {
  constructor(
    private readonly professorMedalService: ProfessorMedalService,
    private readonly professorService: ProfessorService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/medal')
  async create(@Param('id') id: number, @Body() body: CreateProfessorMedalDto) {
    if (!(await this.professorService.findById(id))) {
      throw new BadRequestException(`Professor with ID #${id} does not exists`);
    }

    return await this.professorMedalService.create(id, body);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/medal')
  async find(@Param('id') id: number, @Query() query: FindProfessorMedalDto) {
    if (!(await this.professorService.findById(id))) {
      throw new BadRequestException(`Professor with ID #${id} does not exists`);
    }

    return await this.professorMedalService.find(query);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':professorId/medal/:id')
  async findById(
    @Param('professorId') professorId: number,
    @Param('id') id: number,
  ) {
    if (!(await this.professorService.findById(professorId))) {
      throw new BadRequestException(
        `Professor with ID #${professorId} does not exists`,
      );
    }

    const medal = await this.professorMedalService.findById(id);

    if (!medal) throw new NotFoundException(`Medal with ID #${id} not found`);

    return medal;
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':professorId/medal/:id')
  async update(
    @Param('professorId') professorId: number,
    @Param('id') id: number,
    @Body() body: UpdateProfessorMedalDto,
  ) {
    if (!(await this.professorService.findById(professorId))) {
      throw new BadRequestException(
        `Professor with ID #${professorId} does not exists`,
      );
    }

    if (!(await this.professorMedalService.findById(id))) {
      throw new BadRequestException(`Medal with ID #${id} does not exists`);
    }

    return await this.professorMedalService.update(id, body);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Delete(':professorId/medal/:id')
  async delete(
    @Param('professorId') professorId: number,
    @Param('id') id: number,
  ) {
    if (!(await this.professorService.findById(professorId))) {
      throw new BadRequestException(
        `Professor with ID #${professorId} does not exists`,
      );
    }

    if (!(await this.professorMedalService.findById(id))) {
      throw new BadRequestException(`Medal with ID #${id} does not exists`);
    }

    return await this.professorMedalService.delete(id);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post(':professorId/medal/:medalId/media')
  @UseInterceptors(FileInterceptor('file'))
  async uploadIcon(
    @Param('professorId') professorId: number,
    @Param('medalId') medalId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const professor = await this.professorService.findById(professorId);

      if (!professor) {
        throw new NotFoundException(
          `Professor with ID "${professorId}" not found`,
        );
      }

      return await this.professorMedalService.uploadMedia(
        medalId,
        file,
        `professors/${professorId}/medals/${medalId}/media/`,
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
