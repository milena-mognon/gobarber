/* eslint-disable @typescript-eslint/interface-name-prefix */
declare namespace NodeJS {
  export interface ProcessEnv {
    APP_SECRET: string;
    APP_WEB_URL: string;
    APP_API_URL: string;
  }
}
