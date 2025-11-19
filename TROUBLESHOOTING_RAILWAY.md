# 🚨 Railway 배포 문제 해결 가이드

Railway 배포 시 발생할 수 있는 일반적인 문제와 해결 방법입니다.

---

## 📋 목차

1. [배포 실패 문제](#1-배포-실패-문제)
2. [CORS 에러](#2-cors-에러)
3. [데이터베이스 연결 문제](#3-데이터베이스-연결-문제)
4. [환경 변수 문제](#4-환경-변수-문제)
5. [404 에러](#5-404-에러)
6. [500 서버 에러](#6-500-서버-에러)
7. [파일 업로드 문제](#7-파일-업로드-문제)
8. [메모리 부족](#8-메모리-부족)
9. [빌드 시간 초과](#9-빌드-시간-초과)
10. [도메인 연결 문제](#10-도메인-연결-문제)

---

## 1. 배포 실패 문제

### 증상
- Railway Deployments 탭에 빨간색 X 표시
- "Build failed" 또는 "Deploy failed" 메시지

### 원인 및 해결

#### 1-1. Root Directory 설정 오류

**확인 방법**:
```
Railway → 서비스 → Settings → Source
Root Directory 확인
```

**해결**:
- 백엔드: `server` (정확히 입력)
- 프론트엔드: `client` (정확히 입력)
- 대소문자, 공백 주의

#### 1-2. Dockerfile 경로 문제

**확인 방법**:
```bash
# 프로젝트 구조 확인
jakupbanjang/
  ├── server/
  │   └── Dockerfile  ← 여기 있어야 함
  └── client/
      └── Dockerfile  ← 여기 있어야 함
```

**해결**:
- Dockerfile이 각 디렉토리 안에 있는지 확인
- 파일명 정확히: `Dockerfile` (D 대문자)

#### 1-3. 패키지 설치 실패

**로그 예시**:
```
npm ERR! code ENOTFOUND
npm ERR! 404 Not Found
```

**해결**:
```bash
# 로컬에서 테스트
cd server  # 또는 client
rm -rf node_modules package-lock.json
npm install
npm start  # 정상 작동 확인

# 문제 없으면 다시 커밋
git add .
git commit -m "Fix dependencies"
git push
```

#### 1-4. 빌드 로그 확인 방법

```
Railway → 서비스 → Deployments
→ 빨간 X 클릭 → "View Logs"
→ 에러 메시지 찾기
```

---

## 2. CORS 에러

### 증상
```
Access to XMLHttpRequest has been blocked by CORS policy
```

브라우저 콘솔에서 빨간색 에러 표시

### 원인
백엔드가 프론트엔드 도메인을 허용하지 않음

### 해결

#### 2-1. CLIENT_URL 확인

```
Railway → 백엔드 서비스 → Variables 탭
CLIENT_URL 변수 확인
```

**올바른 예시**:
```
CLIENT_URL = https://frontend-production-c3d4.up.railway.app
```

**잘못된 예시**:
```
❌ http://frontend-production-c3d4.up.railway.app  (http)
❌ frontend-production-c3d4.up.railway.app  (프로토콜 없음)
❌ https://frontend-production-c3d4.up.railway.app/  (끝에 슬래시)
```

#### 2-2. 환경 변수 업데이트 후

1. 저장하면 자동으로 재배포됨 (1-2분 소요)
2. 재배포 완료 후 브라우저 새로고침
3. 캐시 클리어: Ctrl+Shift+R (Windows) 또는 Cmd+Shift+R (Mac)

#### 2-3. 여전히 안 되면

**백엔드 로그 확인**:
```javascript
// server/index.js의 CORS 설정 확인
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL || 'https://your-production-domain.com'
    : 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
```

**디버깅**:
```
Railway → 백엔드 → Logs
"CORS" 검색
```

---

## 3. 데이터베이스 연결 문제

### 증상
- 백엔드 `/health` 응답: `"database": "disconnected"`
- 또는 배포 실패: "Database connection error"

### 해결

#### 3-1. DATABASE_URL 연결 확인

**올바른 설정** (Reference 방식):
```
Railway → 백엔드 → Variables
DATABASE_URL = ${{Postgres.DATABASE_URL}}
```

**설정 방법**:
1. `DATABASE_URL` 변수 추가 시
2. "+ New Variable" 대신 **"+ Reference"** 클릭
3. PostgreSQL 서비스 선택
4. `DATABASE_URL` 변수 선택

#### 3-2. PostgreSQL 서비스 실행 확인

```
Railway → 프로젝트 대시보드
PostgreSQL 서비스가 "Active" 상태인지 확인
```

빨간색이면:
- 서비스 클릭 → "Restart" 버튼

#### 3-3. 데이터베이스 마이그레이션

**문제**: 테이블이 생성되지 않음

**해결**:
```
Railway → 백엔드 → Logs
"Sequelize" 또는 "database" 검색

정상 로그 예시:
"Executing (default): CREATE TABLE..."
"Database synchronized successfully"
```

---

## 4. 환경 변수 문제

### 증상
- 특정 기능이 작동하지 않음
- 로그에 "undefined" 또는 "null" 에러

### 해결

#### 4-1. 필수 환경 변수 체크리스트

**백엔드**:
```
✅ NODE_ENV = production
✅ PORT = 3001
✅ DATABASE_URL = ${{Postgres.DATABASE_URL}}
✅ JWT_SECRET = [64자 키]
✅ ENCRYPTION_KEY = [44자 키]
✅ CLIENT_URL = [프론트엔드 URL]
```

**프론트엔드**:
```
✅ REACT_APP_API_URL = [백엔드 URL]/api
```

#### 4-2. 환경 변수 적용 확인

```javascript
// 백엔드에서 확인
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('CLIENT_URL:', process.env.CLIENT_URL);

// Railway Logs에서 확인
Railway → 백엔드 → Logs
```

#### 4-3. 환경 변수 변경 후

1. 저장
2. 자동 재배포 (1-2분)
3. 재배포 완료까지 대기
4. 브라우저 새로고침

---

## 5. 404 에러

### 증상 1: 프론트엔드 라우팅 404

**문제**: React Router 경로에서 새로고침 시 404

**해결**: 이미 `client/Dockerfile`에서 해결됨
```nginx
# Dockerfile의 nginx 설정
try_files $uri /index.html;
```

**여전히 문제가 있다면**:
```bash
# client/Dockerfile 확인
cat client/Dockerfile

# nginx 설정이 있는지 확인
```

### 증상 2: API 404 에러

**문제**: 프론트엔드에서 API 호출 시 404

**확인**:
```javascript
// 프론트엔드 환경 변수 확인
console.log('API URL:', process.env.REACT_APP_API_URL);

// 올바른 예시: https://backend-xxx.up.railway.app/api
// 잘못된 예시: https://backend-xxx.up.railway.app (api 없음)
```

**해결**:
```
Railway → 프론트엔드 → Variables
REACT_APP_API_URL = [백엔드 URL]/api  ← /api 확인!
```

---

## 6. 500 서버 에러

### 증상
- API 호출 시 500 Internal Server Error
- 또는 백엔드가 크래시됨

### 해결

#### 6-1. 백엔드 로그 확인

```
Railway → 백엔드 → Logs
최근 에러 메시지 찾기
```

**일반적인 에러**:
```
Error: JWT_SECRET is not defined
→ JWT_SECRET 환경 변수 추가

Error: Cannot connect to database
→ DATABASE_URL 확인

Error: ENCRYPTION_KEY is not defined
→ ENCRYPTION_KEY 환경 변수 추가
```

#### 6-2. 코드 에러

**로컬에서 테스트**:
```bash
cd server
NODE_ENV=production npm start

# 에러 발생하면 코드 수정
```

---

## 7. 파일 업로드 문제

### 증상
- 파일 업로드 후 사라짐
- 또는 파일 접근 시 404

### 원인
Railway의 파일시스템은 재시작 시 초기화됨 (Ephemeral Storage)

### 해결 방법

#### 옵션 1: Railway Volume 사용 (추천)

```
Railway → 백엔드 → Settings → Volumes
"+ Add Volume" 클릭

Mount Path: /app/data
```

**코드 수정**:
```javascript
// server/config/multer.js
const storage = multer.diskStorage({
  destination: '/app/data/uploads',  // Volume 경로
  // ...
});
```

#### 옵션 2: 클라우드 스토리지 (더 나은 방법)

- AWS S3
- Cloudflare R2 (저렴)
- Google Cloud Storage

---

## 8. 메모리 부족

### 증상
- 서비스가 자주 재시작됨
- "Out of Memory" 에러

### 해결

#### 8-1. 메모리 사용량 확인

```
Railway → 백엔드 → Metrics
Memory 그래프 확인
```

#### 8-2. 메모리 최적화

**코드 최적화**:
```javascript
// 불필요한 로그 제거
// console.log() 최소화

// 이미지 크기 제한
// multer 설정에서 limits: { fileSize: 5MB }
```

#### 8-3. 메모리 증가 (비용 증가)

```
Railway → 백엔드 → Settings → Resources
Memory 슬라이더 조정
```

---

## 9. 빌드 시간 초과

### 증상
- "Build timeout" 에러
- 빌드가 10분 이상 소요

### 해결

#### 9-1. node_modules 캐싱

Railway는 자동으로 캐싱하지만, 문제 시:
```
Railway → 서비스 → Settings
"Clear Build Cache" 클릭
재배포
```

#### 9-2. 의존성 최적화

```bash
# 불필요한 패키지 제거
cd server  # 또는 client
npm prune --production

# package.json 확인
```

---

## 10. 도메인 연결 문제

### 증상
- 커스텀 도메인 접속 불가
- "DNS_PROBE_FINISHED_NXDOMAIN" 에러

### 해결

#### 10-1. DNS 설정 확인

**CNAME 레코드**:
```
Type: CNAME
Name: app  (또는 api)
Value: [Railway에서 제공한 주소]
TTL: 3600 (또는 Auto)
```

#### 10-2. DNS 전파 확인

```bash
# Windows
nslookup app.yourdomain.com

# 또는 온라인 툴
https://www.whatsmydns.net
```

DNS 전파는 최대 24시간 소요될 수 있음

#### 10-3. Railway 설정 확인

```
Railway → 서비스 → Settings → Networking
Custom Domain이 올바르게 입력되었는지 확인
```

---

## 🆘 여전히 해결되지 않으면

### 1. 로그 수집
```
Railway → 서비스 → Logs
전체 로그 복사
```

### 2. 스크린샷 찍기
- Deployments 화면
- Variables 화면
- 에러 메시지

### 3. 도움 요청
- Railway Discord: https://discord.gg/railway
- GitHub Issues: [프로젝트 저장소]
- Railway 지원팀: support@railway.app

### 4. 제공할 정보
- Railway 프로젝트 ID
- 서비스 이름
- 에러 로그
- 환경 변수 목록 (민감 정보 제외)
- 시도한 해결 방법

---

## 🎯 문제 해결 체크리스트

배포 문제가 발생하면 순서대로 확인:

1. [ ] Railway Logs 확인
2. [ ] 환경 변수 모두 설정됨
3. [ ] Root Directory 올바름
4. [ ] Dockerfile 존재
5. [ ] DATABASE_URL Reference로 연결
6. [ ] CLIENT_URL 정확함
7. [ ] 로컬에서 정상 작동
8. [ ] Git push 성공
9. [ ] Railway 재배포 완료
10. [ ] 브라우저 캐시 클리어

---

## 📞 추가 자료

- [Railway 공식 문서](https://docs.railway.app)
- [Railway 상태 페이지](https://status.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [QUICK_START_RAILWAY.md](./QUICK_START_RAILWAY.md)
- [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)

---

**대부분의 문제는 환경 변수나 경로 설정 문제입니다!** 🔍

마지막 업데이트: 2025-11-19

