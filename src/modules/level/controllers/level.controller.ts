import {
  Body,
  Controller,
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
import { LevelService } from '../services/level.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt';
import { CreateLevelDto } from '../dtos/create-level.dto';
import { LessonService } from 'src/modules/lesson/services/lesson.service';
import { FindLevelDto } from '../dtos/find-level.dto';
import { UpdateLevelDto } from '../dtos/update-level.dto';

@ApiTags('Level')
@Controller('level')
export class LevelController {
  constructor(
    private readonly levelService: LevelService,
    private readonly lessonService: LessonService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post()
  async create(@Body() { lessonId, ...body }: CreateLevelDto) {
    try {
      if (!(await this.lessonService.findById(lessonId))) {
        throw new NotFoundException(`Lesson with ID "${lessonId}" not found`);
      }

      return await this.levelService.create({ lessonId, ...body });
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get()
  async find(@Query() { lessonId, ...query }: FindLevelDto) {
    try {
      if (!(await this.lessonService.findById(lessonId))) {
        throw new NotFoundException(`Lesson with ID "${lessonId}" not found`);
      }

      return await this.levelService.find({ lessonId, ...query });
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      const level = await this.levelService.findById(id);

      if (!level) {
        throw new NotFoundException(`Level with ID "${id}" not found`);
      }

      return level;
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: UpdateLevelDto,
  ) {
    try {
      return await this.levelService.update(id, body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
