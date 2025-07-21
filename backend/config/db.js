import {neon} from "@neondatabase/serverless";
import dotenv from 'dotenv';

dotenv.config();

const {NEON_DB_URL} = process.env;

export const sql = neon(
  NEON_DB_URL,
);

