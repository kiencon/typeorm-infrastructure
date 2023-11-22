import { EntityRepository } from 'typeorm';
import { DetergentFormula } from '../entities';
import BaseRepository from './BaseRepository';

@EntityRepository(DetergentFormula)
export default class DetergentFormulaRepositor extends BaseRepository<DetergentFormula> {}
