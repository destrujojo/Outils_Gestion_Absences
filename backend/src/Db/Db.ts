import { Pool } from "pg";

const pool = new Pool({
  host: "10.40.150.2",
  port: 25432,
  user: "paj",
  password: "Junia_AP5",
  database: "PAJ",
  idleTimeoutMillis: 30000,
});

export default pool;
