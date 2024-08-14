import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://expense-tracker_owner:xeqyhRN21HaQ@ep-proud-wind-a1eg0tsb.ap-southeast-1.aws.neon.tech/expense-tracker?sslmode=require');
const db = drizzle(sql,{schema});