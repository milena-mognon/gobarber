interface IAuth {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}
export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default_for_tests',
    expiresIn: '1d',
  },
} as IAuth;
