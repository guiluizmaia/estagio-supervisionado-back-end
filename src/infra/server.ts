import 'dotenv/config';
import 'reflect-metadata';
import './typeorm';
import './tsyringe'

import App from './http/app';


const PORT = process.env.PORT || 3333;

const app = new App();

app.server.listen(PORT, () => {
  console.log(`Server started in port ${PORT} 🚀🚀🚀`);
});
