import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_token: process.env.JWT_ACCESS_REFRESH_TOKEN,
  store_id: process.env.STORE_ID,
  signature_id: process.env.SIGNATURE_KEY,
  payment_url: process.env.PAYMENT_URL,
  payment_varifyUrl: process.env.PAYMENT_TRANSACTION,
};
