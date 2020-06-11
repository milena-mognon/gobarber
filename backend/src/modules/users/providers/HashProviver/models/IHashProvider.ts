export default interface IHashProvider {
  /**
   * The function recives the data to be hashed, and return a hashed string.
   * @param payload
   */
  generateHash(payload: string): Promise<string>;
  /**
   * The function recives the data without hash (payload) and the hashed one.
   * Return true if match ot false if doesn´t
   * @param payload
   * @param hashed
   */
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
