export default abstract class BaseService<T> {
  abstract create(data: any): Promise<T>;

  abstract getAll(): Promise<T[]>;

  abstract getById(id: number): Promise<T>;

  abstract update(id: number, data: any): Promise<T>;

  abstract delete(id: number): Promise<void>;
}
