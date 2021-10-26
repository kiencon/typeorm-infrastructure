import { EntityRepository } from 'typeorm';
import { Detergent } from '../entity';
import BaseRepository from './BaseRepository';

@EntityRepository(Detergent)
export default class DetergentRepository extends BaseRepository<Detergent> {
  findByName(name: string): Promise<Detergent> {
    return this.findOne({ name });
  }
}
