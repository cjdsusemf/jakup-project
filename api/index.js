// Vercel Serverless Function Entry Point
// 이 파일은 Vercel이 서버리스 함수로 실행합니다

const app = require('../server/index');

// Vercel Serverless Function으로 export
module.exports = app;

