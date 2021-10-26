import { Column, Entity } from 'typeorm';
import BaseEntity from './BaseEntity';

@Entity()
export default class DetergentFormula extends BaseEntity {
  @Column()
  name: string;

  @Column()
  ratio: number;
}
