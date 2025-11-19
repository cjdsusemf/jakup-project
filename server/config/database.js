const { Sequelize } = require('sequelize');
require('dotenv').config();
const path = require('path');

// SQLite 설정 (개발/테스트 환경용)
// 프로덕션 환경에서는 PostgreSQL로 변경하세요
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false
});

// 데이터베이스 연결 테스트
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    console.log('Using SQLite database at:', path.join(__dirname, '../database.sqlite'));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;

