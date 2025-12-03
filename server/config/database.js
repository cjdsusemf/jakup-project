const { Sequelize } = require('sequelize');
require('dotenv').config();

// Supabase PostgreSQL 설정
const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' 
      ? {
          require: true,
          rejectUnauthorized: false
        }
      : false
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// 데이터베이스 연결 테스트
if (process.env.DATABASE_URL) {
  sequelize.authenticate()
    .then(() => {
      console.log('✅ Supabase PostgreSQL connection established successfully.');
    })
    .catch(err => {
      console.error('❌ Unable to connect to the database:', err);
      // Vercel 서버리스 환경에서는 바로 에러를 throw하지 않음
    });
} else {
  console.warn('⚠️  DATABASE_URL not set. Please configure Supabase connection string.');
}

module.exports = sequelize;

