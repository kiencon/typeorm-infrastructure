import { Column, Entity, Index, OneToMany } from 'typeorm';
import BaseEntity from './BaseEntity';
import DetergentFormula from './DetergentFormula';

@Entity()
export default class Detergent extends BaseEntity {
  @Column()
  name: string;

  @Index()
  @Column()
  number: number;

  @OneToMany(() => DetergentFormula, (detergentFormula) => detergentFormula.detergent, {
    cascade: ['insert', 'update', 'remove']
  })
  formulas: DetergentFormula[]
}
