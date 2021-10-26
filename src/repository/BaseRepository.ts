import { Repository } from 'typeorm';
import IEntity from '../entity/IEntity';

abstract class BaseRepository<T extends IEntity> extends Repository<T> {}

export default BaseRepository;
