import { Injectable } from '@nestjs/common';
import { AlternativeRepository } from '../repositories/alternative.repository';

@Injectable()
export class AlternativeService {
  constructor(private readonly alternativeRepository: AlternativeRepository) {}
}
