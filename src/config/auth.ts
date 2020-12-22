const auth = {
  hashSaltRounds: 10,
  jwt: {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    privateKey: process.env.JWT_PRIVATE_KEY,
    publicKey: process.env.JWT_PUBLIC_KEY,
  },
};

export { auth };
