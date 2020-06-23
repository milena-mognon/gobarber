import handlebars from 'handlebars';
import fs from 'fs';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    /**
     * handlebars.compile(template) recives the template (can be html)
     * and return a function
     * this functions will be called on return passing the variables
     */
    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}
