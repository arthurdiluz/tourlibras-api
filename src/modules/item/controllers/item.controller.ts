import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from '../dtos/create-item.dto';
import { Public } from 'src/common/decorators';
import { ProfessorService } from 'src/modules/professor/services/professor.service';

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
}
