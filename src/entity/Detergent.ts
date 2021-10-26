import { Column, Entity } from 'typeorm';
import BaseEntity from './BaseEntity';

@Entity()
export default class Detergent extends BaseEntity {
  @Column()
  name: string;

  @Column()
  number: number;
}
