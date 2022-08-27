export default {
    secretKey: process.env.SECRET_KEY || 'test',
    expiresIn: '1d',
    token_validator: process.env.TOKEN_VALIDATOR || 'test',
  };
  