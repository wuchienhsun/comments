export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    db: process.env.DATABASE_DB,
    user: process.env.DATABASE_USER,
    pwd: process.env.DATABASE_PASSWORD,
  },
});
