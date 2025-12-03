const multer = require('multer');

// Vercel 서버리스 환경에서는 파일 시스템을 사용할 수 없으므로 메모리 스토리지 사용
// 파일은 Supabase Storage로 업로드됨
const storage = multer.memoryStorage();

// 파일 필터 (선택적)
const fileFilter = (req, file, cb) => {
  // 허용할 파일 형식 (필요에 따라 수정)
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'application/zip',
    'application/x-zip-compressed'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('지원하지 않는 파일 형식입니다.'), false);
  }
};

// multer 설정 - 메모리 스토리지 사용 (Vercel Serverless 호환)
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB 제한
  },
  fileFilter: fileFilter
});

module.exports = upload;

