import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(dirname, '../.env'),
});

export default {
  PORT: process.env['PORT'],
  HOST: process.env['HOST'],
};