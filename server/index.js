const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const sequelize = require('./config/database');
const setupAssociations = require('./config/associations');
const logger = require('./config/logger');
const requestLogger = require('./middlewares/requestLogger');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const commentRoutes = require('./routes/commentRoutes');
const attachmentRoutes = require('./routes/attachmentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const foremanRoutes = require('./routes/foremanRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// 모델 관계 설정
setupAssociations();

// CORS 설정 - 보안 강화
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL || 'https://your-production-domain.com'  // 프로덕션 도메인
    : 'http://localhost:3000',  // 개발 환경
  credentials: true,  // 쿠키 및 인증 정보 허용
  optionsSuccessStatus: 200
};

// 미들웨어
app.use(requestLogger);  // HTTP 요청 로깅
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vercel 서버리스 환경에서는 파일 시스템 사용 불가
// 파일은 Supabase Storage를 통해 제공됨

// 라우터 등록
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api', commentRoutes);      // /api/tasks/:taskId/comments
app.use('/api', attachmentRoutes);   // /api/tasks/:taskId/attachments
app.use('/api/admin', adminRoutes);  // /api/admin/* (관리자 전용)
app.use('/api/foreman', foremanRoutes); // /api/foreman/* (작업반장 전용)

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Server is running');
});

/**
 * 헬스체크 엔드포인트
 * Docker, PM2, 로드 밸런서 등에서 서버 상태 확인용
 */
app.get('/health', async (req, res) => {
  try {
    // 데이터베이스 연결 확인
    await sequelize.authenticate();
    
    // 서버 가동 시간 계산
    const uptime = process.uptime();
    const uptimeFormatted = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`;
    
    // 메모리 사용량
    const memoryUsage = process.memoryUsage();
    const memoryUsageMB = {
      rss: Math.round(memoryUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      external: Math.round(memoryUsage.external / 1024 / 1024)
    };
    
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: uptimeFormatted,
      uptimeSeconds: Math.floor(uptime),
      environment: process.env.NODE_ENV || 'development',
      database: 'connected',
      memory: memoryUsageMB,
      version: require('./package.json').version || '1.0.0'
    });
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Database connection failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * 준비 상태 확인 엔드포인트 (Kubernetes Readiness Probe 등)
 */
app.get('/ready', (req, res) => {
  // 서버가 트래픽을 받을 준비가 되었는지 확인
  res.status(200).json({
    ready: true,
    timestamp: new Date().toISOString()
  });
});

// 404 에러 핸들러 (모든 라우트 아래에 위치)
app.use(notFoundHandler);

// 전역 에러 핸들러 (가장 마지막에 위치)
app.use(errorHandler);

// 데이터베이스 동기화 및 서버 시작
// 개발 단계: alter: true (테이블 구조 자동 업데이트, 데이터 보존)
// 프로덕션: 마이그레이션 사용 권장
// 주의: force: true는 모든 데이터를 삭제하므로 절대 사용 금지!
const syncOptions = process.env.NODE_ENV === 'production' 
  ? { alter: false }  // 프로덕션에서는 자동 동기화 비활성화
  : { alter: true };  // 개발 환경에서는 스키마 자동 업데이트

// Vercel 서버리스 환경에서는 앱을 export
if (process.env.VERCEL) {
  // Vercel 환경: 데이터베이스 동기화만 수행
  sequelize.sync(syncOptions)
    .then(() => {
      logger.info('Database synchronized for Vercel deployment');
    })
    .catch(err => {
      logger.error('Failed to sync database:', err);
    });
  
  // Vercel Serverless Function으로 export
  module.exports = app;
} else {
  // 로컬 개발 환경: 일반 서버 실행
  sequelize.sync(syncOptions)
    .then(() => {
      logger.info('Database synchronized');
      app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
        logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      });
    })
    .catch(err => {
      logger.error('Failed to sync database:', err);
      process.exit(1);
    });
}

