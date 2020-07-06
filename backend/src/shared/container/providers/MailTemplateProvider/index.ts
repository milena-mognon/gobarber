import { container } from 'tsyringe';
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './models/IMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
  // can add more providers
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
