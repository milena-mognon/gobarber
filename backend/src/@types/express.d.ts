declare namespace Express {
  // axena o que for colocado aqui dentro no Request
  export interface Request {
    user: {
      id: string;
    };
  }
}
