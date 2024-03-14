import { env } from "@/env";
import * as schema from "./schema";
import { NeonQueryFunction, neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const conn: NeonQueryFunction<boolean, boolean> = neon(env.DATABASE_URL);

export const db = drizzle(conn, { schema });

