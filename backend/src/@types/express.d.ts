declare namespace Express {
  // anexa o que for colocado aqui dentro no Request
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  export interface Request {
    user: {
      id: string;
    };
  }
}
