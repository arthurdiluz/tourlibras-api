import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProfessorItemService } from '../services/professor-item.service';
import { ProfessorService } from 'src/modules/professor/services/professor.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateProfessorItemDto } from '../dtos/create-professor-item.dto';
import { FindProfessorItemDto } from '../dtos/find-professor-item.dto';

@Controller('professor')
export class ProfessorItemController {
  constructor(
    private readonly professorService: ProfessorService,
    private readonly professorItemService: ProfessorItemService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/item')
  async create(@Param('id') id: number, @Body() body: CreateProfessorItemDto) {
    try {
      if (!(await this.professorService.findById(id))) {
        throw new BadRequestException(
          `Professor with ID #${id} does not exist`,
        );
      }

      return await this.professorItemService.create(id, body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/item')
  async find(@Param('id') id: number, @Body() query: FindProfessorItemDto) {
    try {
      if (!(await this.professorService.findById(id))) {
        throw new BadRequestException(
          `Professor with ID #${id} does not exist`,
        );
      }

      return await this.professorItemService.find(id, query);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
