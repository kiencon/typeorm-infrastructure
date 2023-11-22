import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from './BaseEntity';
import Detergent from './Detergent';

@Entity()
export default class DetergentFormula extends BaseEntity {
  @Column()
  name: string;

  @Column()
  ratio: number;

  @ManyToOne(() => Detergent, (detergent) => detergent.formulas)
  detergent: Detergent;
}
