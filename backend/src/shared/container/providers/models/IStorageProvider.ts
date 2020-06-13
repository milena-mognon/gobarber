export default interface IStorageProvider {
  /**
   * Recives the file path and return the complete path
   * of where it was saved
   * @param file
   */
  saveFile(file: string): Promise<string>;

  /**
   * Recives the file to be deleted
   * @param file
   */
  deleteFile(file: string): Promise<void>;
}
