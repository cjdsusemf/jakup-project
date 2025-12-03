const winston = require('winston');
const path = require('path');

// 로그 레벨 정의
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

// 환경에 따른 로그 레벨 설정
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// 로그 색상 정의
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};

winston.addColors(colors);

// 로그 포맷 정의
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// 파일용 포맷 (색상 제거)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// 트랜스포트 설정
// Vercel Serverless 환경에서는 콘솔 로깅만 사용
// 파일 시스템이 read-only이므로 파일 로깅 비활성화
const transports = [
  new winston.transports.Console({
    format: format
  })
];

// Logger 생성
const logger = winston.createLogger({
  level: level(),
  levels,
  transports
});

module.exports = logger;

