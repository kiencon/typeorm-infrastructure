import { EntityRepository } from 'typeorm';
import { Detergent } from '../entities';
import BaseRepository from './BaseRepository';

@EntityRepository(Detergent)
export default class CustomDetergentRepository extends BaseRepository<Detergent> {
  findByNumber(number: number): Promise<Detergent> {
    return this.findOne({ number });
  }
}
