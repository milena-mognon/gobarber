/* eslint-disable @typescript-eslint/interface-name-prefix */
declare namespace NodeJS {
  export interface ProcessEnv {
    APP_SECRET: string;
    APP_WEB_URL: string;
    APP_API_URL: string;
    MAIL_DRIVER: string;
    AWS_ACCESS_KEY_ID?: string;
    AWS_SECRET_ACCESS_KEY?: string;
    AWS_REGION?: string;
  }
}
