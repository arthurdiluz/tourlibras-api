import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlternativeService } from '../services/alternative.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt';
import { CreateAlternativeDto } from '../dtos/create-alternative.dto';
import { ExerciseService } from 'src/modules/exercise/services/exercise.service';
import { FindAlternativeDto } from '../dtos/find-alternative.dto';
import { UpdateAlternativeDto } from '../dtos/update-alternative.dto';

@ApiTags('Alternative')
@Controller('alternative')
export class AlternativeController {
  constructor(
    private readonly alternativeService: AlternativeService,
    private readonly exerciseService: ExerciseService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post()
  async create(@Body() { exerciseId, ...body }: CreateAlternativeDto) {
    try {
      if (!(await this.exerciseService.findById(exerciseId))) {
        throw new NotFoundException(
          `Exercise with ID "${exerciseId}" not found`,
        );
      }

      return await this.alternativeService.create({ exerciseId, ...body });
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get()
  async find(@Query() { exerciseId, ...query }: FindAlternativeDto) {
    try {
      if (!(await this.exerciseService.findById(exerciseId))) {
        throw new NotFoundException(
          `Exercise with ID "${exerciseId}" not found`,
        );
      }

      return await this.alternativeService.find(query);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      const alternative = await this.alternativeService.findById(id);

      if (!alternative) {
        throw new NotFoundException(`Alternative with ID "${id}" not found`);
      }

      return alternative;
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() { exerciseId, ...body }: UpdateAlternativeDto,
  ) {
    try {
      if (!(await this.exerciseService.findById(exerciseId))) {
        throw new NotFoundException(
          `Exercise with ID "${exerciseId}" not found`,
        );
      }

      return await this.alternativeService.update(id, body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.alternativeService.delete(id);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
