import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from '../dtos/create-item.dto';
import { Public } from 'src/common/decorators';
import { ProfessorService } from 'src/modules/professor/services/professor.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt';
import { FindItemDto } from '../dtos/find-item.dto';

@ApiTags('Item')
@Controller('api/v1/professor')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly professorService: ProfessorService,
  ) {}

  @Public()
  @Post()
  async create(@Body() { professorId, ...body }: CreateItemDto) {
    try {
      if (!(await this.professorService.findById(professorId))) {
        throw new NotFoundException(
          `Professor with ID "${professorId}" not found`,
        );
      }

      return await this.itemService.create({ professorId, ...body });
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get()
  async find(@Query() query: FindItemDto) {
    try {
      return await this.itemService.find(query);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      const item = await this.itemService.findById(id);

      if (!item) {
        throw new NotFoundException(`Item with ID "${id}" not found`);
      }

      return item;
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
