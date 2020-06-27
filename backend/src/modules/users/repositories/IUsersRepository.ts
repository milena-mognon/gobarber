import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUserRepository {
  /**
   * Find a user by email
   * @param email
   */
  findByEmail(email: string): Promise<User | undefined>;

  /**
   * Find a User by id
   * @param id
   */
  findById(id: string): Promise<User | undefined>;

  /**
   * Receives the data to create the user, but doesn´t save
   * on database
   * @param data
   */
  create(data: ICreateUserDTO): Promise<User>;

  /**
   * Receives a user save on database
   * @param user
   */
  save(user: User): Promise<User>;

  /**
   * Find all the providers.
   * Can recive as a param one user_id to be excluded from the search
   * @param data
   */
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
}
