
  /** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://expense-tracker_owner:xeqyhRN21HaQ@ep-proud-wind-a1eg0tsb.ap-southeast-1.aws.neon.tech/expense-tracker?sslmode=require',
  }
};