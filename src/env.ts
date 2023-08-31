const ENV = {
  Application: {
    PORT: Number(process.env.PORT)
  },
  TokenConfig: {
    JWT_KEY: process.env.JWT_KEY as string,
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN as string
  },
  Logger: {
    ENABLED: !!process.env.ENABLED,
    LEVEL: process.env.LEVEL as string
  }
};

export default ENV;
