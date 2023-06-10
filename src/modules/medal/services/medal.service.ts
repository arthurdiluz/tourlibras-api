import { Injectable } from '@nestjs/common';
import { MedalRepository } from '../repositories/medal.repository';

@Injectable()
export class MedalService {
  constructor(private readonly medalRepository: MedalRepository) {}
}
