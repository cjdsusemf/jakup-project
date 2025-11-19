#!/usr/bin/env node

/**
 * Railway 배포용 보안 키 생성 스크립트
 * 
 * 사용법:
 *   node generate-keys.js
 * 
 * 이 스크립트는 배포에 필요한 보안 키들을 생성합니다:
 * - JWT_SECRET: JWT 토큰 서명용 키
 * - ENCRYPTION_KEY: 주민번호 등 민감 정보 암호화용 키
 */

const crypto = require('crypto');

console.log('\n==============================================');
console.log('🔐 Railway 배포용 보안 키 생성');
console.log('==============================================\n');

// JWT Secret 생성 (64자 hex 문자열)
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log('📌 JWT_SECRET:');
console.log(jwtSecret);
console.log('');

// Encryption Key 생성 (44자 base64 문자열)
const encryptionKey = Buffer.from(crypto.randomBytes(32)).toString('base64');
console.log('📌 ENCRYPTION_KEY:');
console.log(encryptionKey);
console.log('');

console.log('==============================================');
console.log('✅ 키 생성 완료!');
console.log('==============================================\n');

console.log('📋 다음 단계:');
console.log('1. 위의 키들을 안전한 곳에 복사하세요 (메모장, 비밀번호 관리자 등)');
console.log('2. Railway 대시보드에서 환경 변수로 추가하세요:');
console.log('   - Backend Service → Variables 탭');
console.log('   - 각각 JWT_SECRET, ENCRYPTION_KEY로 추가');
console.log('3. 이 키들은 절대 GitHub에 커밋하지 마세요!');
console.log('4. 프로덕션 환경에서만 사용하세요 (개발용 키는 따로 관리)\n');

console.log('⚠️  보안 주의사항:');
console.log('- 이 키들을 공개하지 마세요');
console.log('- 정기적으로 키를 변경하세요 (3-6개월마다)');
console.log('- 키가 유출되면 즉시 새로 생성하고 교체하세요\n');

