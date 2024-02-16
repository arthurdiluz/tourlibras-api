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
  UseGuards,
} from '@nestjs/common';
import { ProfessorItemService } from '../services/professor-item.service';
import { ProfessorService } from 'src/modules/professor/services/professor.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateProfessorItemDto } from '../dtos/create-professor-item.dto';
import { FindProfessorItemDto } from '../dtos/find-professor-item.dto';
import { UpdateProfessorItemDto } from '../dtos/update-professor-item.dto';

@Controller('professor')
export class ProfessorItemController {
  constructor(
    private readonly professorService: ProfessorService,
    private readonly professorItemService: ProfessorItemService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/item')
  async create(@Param('id') id: number, @Body() body: CreateProfessorItemDto) {
    if (!(await this.professorService.findById(id))) {
      throw new BadRequestException(`Professor with ID #${id} does not exist`);
    }

    return await this.professorItemService.create(id, body);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/item')
  async find(@Param('id') id: number, @Body() query: FindProfessorItemDto) {
    if (!(await this.professorService.findById(id))) {
      throw new BadRequestException(`Professor with ID #${id} does not exist`);
    }

    return await this.professorItemService.find(id, query);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':professorId/item/:id')
  async findById(
    @Param('professorId') professorId: number,
    @Param('id') id: number,
  ) {
    if (!(await this.professorService.findById(professorId))) {
      throw new BadRequestException(
        `Professor with ID #${professorId} does not exist`,
      );
    }

    const item = await this.professorItemService.findById(id);

    if (!item) {
      throw new NotFoundException(`Item with ID #${id} not found`);
    }

    return item;
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':professorId/item/:id')
  async update(
    @Param('professorId') professorId: number,
    @Param('id') id: number,
    @Body() body: UpdateProfessorItemDto,
  ) {
    if (!(await this.professorService.findById(professorId))) {
      throw new BadRequestException(
        `Professor with ID #${professorId} does not exist`,
      );
    }

    if (!(await this.professorItemService.findById(id))) {
      throw new BadRequestException(`Item with ID #${id} does not exist`);
    }

    return await this.professorItemService.update(id, body);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Delete(':professorId/item/:id')
  async delete(
    @Param('professorId') professorId: number,
    @Param('id') id: number,
  ) {
    if (!(await this.professorService.findById(professorId))) {
      throw new BadRequestException(
        `Professor with ID #${professorId} does not exist`,
      );
    }

    if (!(await this.professorItemService.findById(id))) {
      throw new BadRequestException(`Item with ID #${id} does not exist`);
    }

    return await this.professorItemService.delete(id);
  }
}
