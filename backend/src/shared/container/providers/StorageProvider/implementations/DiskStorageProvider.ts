import fs from 'fs';
import uploadConfig from '@config/upload';
import path from 'path';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  /**
   * Recives the file (only the name) that multer already saved on tmp folder
   * and move to the uploads folder.
   * Return the file name
   * @param file
   */
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  /**
   * Recives the file and delete from uploads directory
   * If the file doesn´t exist, does nothing
   * @param file
   */
  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
