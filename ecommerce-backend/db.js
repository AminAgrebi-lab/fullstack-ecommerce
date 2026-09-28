const mysql = require('mysql2');
require('dotenv').config();

// إنشاء Pool من الاتصالات لأداء أفضل
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  multipleStatements: true // السماح بتنفيذ استعلامات متعددة
});

module.exports = pool;