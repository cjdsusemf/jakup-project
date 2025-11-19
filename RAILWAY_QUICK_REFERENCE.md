# 🚂 Railway 배포 빠른 참조 카드

Railway 배포 시 자주 필요한 정보와 명령어 모음입니다.

---

## 🔑 보안 키 생성

### 방법 1: 자동 스크립트 (가장 쉬움)
```bash
node generate-keys.js
```

### 방법 2: 수동 생성
```bash
# JWT Secret (64자)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Encryption Key (44자)
node -e "console.log(Buffer.from(require('crypto').randomBytes(32)).toString('base64'))"
```

---

## 🌐 환경 변수 설정

### 백엔드 (Backend Service)

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `NODE_ENV` | `production` | 프로덕션 모드 |
| `PORT` | `3001` | 서버 포트 (자동) |
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` | DB 연결 (Reference) |
| `JWT_SECRET` | [생성한 64자 키] | JWT 서명 키 |
| `ENCRYPTION_KEY` | [생성한 44자 키] | 암호화 키 |
| `CLIENT_URL` | [프론트엔드 URL] | CORS 설정 |

**중요**: `DATABASE_URL`은 "+ Reference" 버튼으로 PostgreSQL 서비스와 연결!

### 프론트엔드 (Frontend Service)

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `REACT_APP_API_URL` | `https://backend-xxx.up.railway.app/api` | 백엔드 API URL |

**주의**: `/api` 경로를 반드시 포함!

---

## 📁 프로젝트 구조 설정

### 백엔드 서비스
```
Root Directory: server
Dockerfile: server/Dockerfile
Port: 3001
```

### 프론트엔드 서비스
```
Root Directory: client
Dockerfile: client/Dockerfile
Port: 80 (자동)
```

---

## 🔗 URL 구조 예시

### Railway 기본 URL
```
백엔드:  https://backend-production-a1b2.up.railway.app
프론트엔드: https://frontend-production-c3d4.up.railway.app
```

### 커스텀 도메인 (선택)
```
백엔드:  https://api.mysite.com
프론트엔드: https://app.mysite.com
```

---

## ✅ 배포 확인 체크리스트

### 백엔드 확인
```bash
# 헬스체크
curl https://your-backend-url.up.railway.app/health

# 예상 응답
{"status":"healthy","database":"connected",...}
```

### 프론트엔드 확인
- 브라우저에서 프론트엔드 URL 접속
- 로그인 페이지가 표시되면 성공

### CORS 확인
- 프론트엔드에서 로그인 시도
- 브라우저 콘솔에 CORS 에러 없으면 성공

---

## 🔄 배포 워크플로우

### 1. 초기 배포
```bash
# 1. 코드 커밋
git add .
git commit -m "Initial deployment"

# 2. GitHub 푸시
git push origin main

# 3. Railway에서 자동 배포 (5-10분)
```

### 2. 업데이트 배포
```bash
# 코드 수정 후
git add .
git commit -m "Update feature"
git push

# Railway가 자동으로 재배포
```

---

## 💰 비용 예상 (10-30명 사용자)

| 항목 | 사용량 | 비용 |
|------|--------|------|
| 백엔드 | 1 vCPU, 512MB | ~$2-3/월 |
| 프론트엔드 | Static | ~$1/월 |
| PostgreSQL | 1GB | ~$1-2/월 |
| **합계** | - | **$4-6/월** |
| **무료 크레딧** | - | **$5/월** |
| **실제 비용** | - | **$0-1/월** ✅ |

---

## 🐛 문제 해결 빠른 가이드

### 배포 실패
```
문제: 빌드 중 에러
해결: Deployments → View Logs 확인
     환경 변수 누락 확인
     Root Directory 확인 (server/client)
```

### CORS 에러
```
문제: 프론트엔드에서 API 호출 실패
해결: 백엔드 CLIENT_URL 확인
     프론트엔드 URL과 정확히 일치하는지 확인
     https:// 포함 확인
```

### 데이터베이스 연결 실패
```
문제: Database: disconnected
해결: DATABASE_URL이 Reference로 연결되었는지 확인
     PostgreSQL 서비스가 실행 중인지 확인
```

### 404 Not Found (프론트엔드)
```
문제: React Router 경로에서 새로고침 시 404
해결: 이미 Dockerfile에서 해결됨 (try_files)
     문제 지속 시 nginx 설정 확인
```

---

## 📊 모니터링 URL

### Railway 대시보드
```
프로젝트: https://railway.app/project/[project-id]
사용량: https://railway.app/account/usage
```

### 헬스체크 엔드포인트
```
백엔드: https://your-backend-url.up.railway.app/health
```

### 로그 확인
```
Railway → 서비스 선택 → Logs 탭
```

---

## 🔒 보안 체크리스트

- [x] `.env` 파일이 `.gitignore`에 포함
- [x] JWT_SECRET는 64자 이상 랜덤 문자열
- [x] ENCRYPTION_KEY는 Base64 인코딩된 32바이트
- [x] 프로덕션 환경 변수는 절대 커밋 안함
- [x] CLIENT_URL은 정확한 프론트엔드 URL
- [x] DATABASE_URL은 Railway Reference 사용

---

## 🎯 자주 사용하는 명령어

### Git 명령어
```bash
# 상태 확인
git status

# 변경사항 커밋
git add .
git commit -m "message"

# 푸시 (자동 배포 트리거)
git push origin main

# 브랜치 확인
git branch

# 원격 저장소 확인
git remote -v
```

### Railway CLI (선택사항)
```bash
# 설치
npm i -g @railway/cli

# 로그인
railway login

# 로그 확인
railway logs

# 환경 변수 확인
railway variables
```

---

## 📞 도움 받기

### Railway 지원
- 공식 문서: https://docs.railway.app
- Discord: https://discord.gg/railway
- 상태 페이지: https://status.railway.app

### 프로젝트 이슈
- GitHub Issues: [프로젝트 저장소]/issues

---

## 🎉 성공 기준

배포가 성공적으로 완료되었다면:

✅ 백엔드 `/health`가 `200 OK` 응답  
✅ 프론트엔드 접속 시 로그인 페이지 표시  
✅ 회원가입/로그인 정상 작동  
✅ 작업 생성/조회 정상 작동  
✅ Railway Usage가 무료 크레딧 범위 내  
✅ 자동 배포 (Git push) 작동  

---

## 📝 배포 후 TODO

- [ ] 팀원들에게 URL 공유
- [ ] 테스트 데이터 생성
- [ ] 정기 백업 설정 (선택)
- [ ] 업타임 모니터링 설정 (선택)
- [ ] 커스텀 도메인 연결 (선택)
- [ ] 사용량 모니터링 일정 설정

---

**이 참조 카드를 인쇄하거나 북마크해두세요!** 📌

마지막 업데이트: 2025-11-19

