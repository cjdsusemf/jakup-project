# 🚂 Railway.app 배포 가이드

**예산**: 월 $5-10  
**사용자**: 10-30명  
**난이도**: ⭐ 초보자 친화적

---

## 📋 목차
1. [사전 준비](#사전-준비)
2. [Railway 회원가입](#railway-회원가입)
3. [GitHub 저장소 준비](#github-저장소-준비)
4. [백엔드 배포](#백엔드-배포)
5. [프론트엔드 배포](#프론트엔드-배포)
6. [도메인 연결 (선택사항)](#도메인-연결)
7. [비용 관리](#비용-관리)
8. [문제 해결](#문제-해결)

---

## 🎯 사전 준비

### 1. 필요한 계정
- [ ] GitHub 계정
- [ ] Railway 계정 (GitHub로 가입 가능)
- [ ] 신용카드 (무료 크레딧 받기 위해 필요, 자동 결제 없음)

### 2. 보안 키 생성

**중요**: 배포 전에 보안 키를 새로 생성해야 합니다!

#### JWT Secret 생성
```bash
# Windows PowerShell에서 실행
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

복사해두세요! 예시: `a1b2c3d4e5f6...` (64자)

#### Encryption Key 생성
```bash
# Windows PowerShell에서 실행
node -e "console.log(Buffer.from(require('crypto').randomBytes(32)).toString('base64'))"
```

복사해두세요! 예시: `xYzAbC123...` (44자)

---

## 🔐 Railway 회원가입

1. **Railway.app 접속**
   - https://railway.app 방문
   - "Start a New Project" 클릭

2. **GitHub 계정으로 가입**
   - "Login with GitHub" 클릭
   - GitHub 권한 승인

3. **무료 크레딧 받기**
   - 대시보드에서 "Settings" → "Account"
   - 신용카드 등록 (월 $5 무료 크레딧)
   - **자동 결제 안됨**: 크레딧 소진 시 알림만 옴

---

## 📂 GitHub 저장소 준비

### 1. GitHub에 코드 업로드

```bash
# 프로젝트 디렉토리에서 실행
cd "C:\Users\ehdrj\OneDrive\Desktop\JAKUP VER.1\jakupbanjang"

# Git 초기화 (이미 되어있다면 생략)
git init

# .gitignore 확인
# .env 파일이 포함되어 있는지 확인!

# 커밋
git add .
git commit -m "Initial commit for Railway deployment"

# GitHub 저장소 생성 후 연결
# GitHub에서 새 저장소 생성: https://github.com/new
git remote add origin https://github.com/your-username/jakup-project.git
git branch -M main
git push -u origin main
```

### 2. .gitignore 확인

`jakupbanjang/.gitignore` 파일에 다음이 포함되어 있는지 확인:

```gitignore
# 환경 변수 (절대 커밋 금지!)
.env
.env.local
.env.production

# 데이터베이스
*.sqlite
*.sqlite.backup*

# 로그
logs/
*.log

# 업로드 파일
uploads/

# node_modules
node_modules/

# 빌드 파일
build/
dist/
```

---

## 🖥️ 백엔드 배포

### 1단계: 새 프로젝트 생성

1. Railway 대시보드에서 **"New Project"** 클릭
2. **"Deploy from GitHub repo"** 선택
3. 저장소 선택: `jakup-project` (또는 저장소 이름)

### 2단계: PostgreSQL 추가

1. 프로젝트 화면에서 **"+ New"** 클릭
2. **"Database"** → **"Add PostgreSQL"** 선택
3. 자동으로 데이터베이스 생성됨

### 3단계: 백엔드 서비스 생성

1. **"+ New"** → **"GitHub Repo"** 클릭
2. 저장소 선택 후 **"Add Service"**

### 4단계: 백엔드 설정

1. 백엔드 서비스 클릭
2. **"Settings"** 탭으로 이동

#### Root Directory 설정
- **Root Directory**: `server`
- **Build Command**: (비워둠, Dockerfile 사용)
- **Start Command**: (비워둠, Dockerfile 사용)

#### 환경 변수 설정

**"Variables"** 탭에서 다음 환경 변수 추가:

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `NODE_ENV` | `production` | 환경 설정 |
| `PORT` | `3001` | 서버 포트 |
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` | Railway가 자동 생성 |
| `JWT_SECRET` | [생성한 JWT 키] | 위에서 생성한 64자 키 붙여넣기 |
| `ENCRYPTION_KEY` | [생성한 암호화 키] | 위에서 생성한 44자 키 붙여넣기 |
| `CLIENT_URL` | (나중에 설정) | 프론트엔드 URL (아직 비워둠) |

**DATABASE_URL 연결 방법**:
1. `DATABASE_URL` 필드의 값에서 오른쪽 **"+ Reference"** 클릭
2. PostgreSQL 서비스 선택
3. `DATABASE_URL` 변수 선택

### 5단계: 배포 확인

1. 자동으로 빌드 및 배포 시작
2. **"Deployments"** 탭에서 진행 상황 확인
3. 성공하면 ✅ 표시

#### 백엔드 URL 확인

1. **"Settings"** 탭
2. **"Networking"** 섹션
3. **"Generate Domain"** 클릭
4. 생성된 URL 복사 (예: `https://jakup-backend-production.up.railway.app`)

---

## 🎨 프론트엔드 배포

### 1단계: 프론트엔드 서비스 추가

1. 프로젝트 화면에서 **"+ New"** 클릭
2. **"GitHub Repo"** 선택
3. 같은 저장소 선택 후 **"Add Service"**

### 2단계: 프론트엔드 설정

1. 새로 생성된 서비스 클릭 (이름 변경: "frontend")
2. **"Settings"** 탭으로 이동

#### Root Directory 설정
- **Root Directory**: `client`
- **Build Command**: (비워둠, Dockerfile 사용)
- **Start Command**: (비워둠, Dockerfile 사용)

#### 환경 변수 설정

**"Variables"** 탭에서 추가:

| 변수명 | 값 |
|--------|-----|
| `REACT_APP_API_URL` | [백엔드 URL] |

예시: `https://jakup-backend-production.up.railway.app`

### 3단계: 프론트엔드 도메인 생성

1. **"Settings"** → **"Networking"**
2. **"Generate Domain"** 클릭
3. 생성된 URL 복사 (예: `https://jakup-frontend-production.up.railway.app`)

### 4단계: 백엔드에 프론트엔드 URL 추가

1. 백엔드 서비스로 돌아가기
2. **"Variables"** 탭
3. `CLIENT_URL` 변수 추가:
   - 값: [프론트엔드 URL] (예: `https://jakup-frontend-production.up.railway.app`)
4. 저장하면 자동으로 재배포됨

---

## ✅ 배포 완료 확인

### 1. 백엔드 테스트

브라우저에서 백엔드 URL 접속:
```
https://your-backend-url.up.railway.app/health
```

응답이 나오면 성공! 예시:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-11-19T..."
}
```

### 2. 프론트엔드 테스트

브라우저에서 프론트엔드 URL 접속:
```
https://your-frontend-url.up.railway.app
```

로그인 페이지가 보이면 성공!

### 3. 전체 기능 테스트

1. 회원가입
2. 로그인
3. 작업 생성/조회
4. 파일 업로드

---

## 🌐 도메인 연결 (선택사항)

자신만의 도메인을 사용하고 싶다면:

### 1. 도메인 구매
- Namecheap, GoDaddy, Cloudflare 등에서 구매
- 연간 $10-20

### 2. Railway에 도메인 연결

#### 프론트엔드 도메인 (예: app.mysite.com)
1. Railway 프론트엔드 서비스 → **"Settings"** → **"Networking"**
2. **"Custom Domain"** 입력: `app.mysite.com`
3. DNS 레코드 추가 (도메인 제공업체에서):
   - Type: `CNAME`
   - Name: `app`
   - Value: (Railway에서 제공하는 주소)

#### 백엔드 도메인 (예: api.mysite.com)
1. Railway 백엔드 서비스 → **"Settings"** → **"Networking"**
2. **"Custom Domain"** 입력: `api.mysite.com`
3. DNS 레코드 추가:
   - Type: `CNAME`
   - Name: `api`
   - Value: (Railway에서 제공하는 주소)

#### 환경 변수 업데이트
- 백엔드 `CLIENT_URL`: `https://app.mysite.com`
- 프론트엔드 `REACT_APP_API_URL`: `https://api.mysite.com`

---

## 💰 비용 관리

### 무료 크레딧
- **월 $5 무료** (신용카드 등록 시)
- 30-50명 사용자까지 충분

### 예상 비용 (10-30명 사용자)

| 항목 | 무료 플랜 | 예상 사용 |
|------|-----------|-----------|
| 백엔드 (1 vCPU, 512MB) | ~$2-3/월 | ✅ 무료 크레딧 내 |
| 프론트엔드 (Static) | ~$1/월 | ✅ 무료 크레딧 내 |
| PostgreSQL | ~$1-2/월 | ✅ 무료 크레딧 내 |
| **합계** | **~$4-6/월** | **무료 크레딧으로 충분** |

### 비용 모니터링
1. Railway 대시보드 → **"Usage"**
2. 실시간 사용량 확인
3. $5 초과 시 이메일 알림

### 비용 절약 팁
1. **개발/테스트는 로컬에서**: Railway는 프로덕션용으로만
2. **로그 정리**: 오래된 로그 자동 삭제 설정
3. **이미지 최적화**: 업로드 파일 크기 제한
4. **예산 알림 설정**: $5, $7, $10 단계별 알림

---

## 🔄 자동 배포 설정

### GitHub 푸시로 자동 배포

Railway는 기본적으로 GitHub 푸시 시 자동 배포됩니다!

```bash
# 코드 수정 후
git add .
git commit -m "Update feature"
git push

# Railway가 자동으로 감지하고 배포 시작
```

### 특정 브랜치만 배포

1. Railway 서비스 → **"Settings"**
2. **"Source"** 섹션
3. **"Branch"**: `main` 또는 `production`

---

## 🔧 문제 해결

### 1. 배포가 실패함

**증상**: 빌드 중 에러 발생

**해결방법**:
1. Railway 서비스 → **"Deployments"** → 실패한 배포 클릭
2. **"View Logs"**에서 에러 메시지 확인
3. 일반적인 원인:
   - 환경 변수 누락 → 다시 확인
   - Dockerfile 경로 문제 → Root Directory 확인
   - 패키지 설치 실패 → `package.json` 확인

### 2. 데이터베이스 연결 실패

**증상**: `/health` 응답에서 `database: "disconnected"`

**해결방법**:
1. 백엔드 서비스 → **"Variables"**
2. `DATABASE_URL`이 PostgreSQL 서비스와 연결되었는지 확인
3. PostgreSQL 서비스가 실행 중인지 확인

### 3. CORS 에러

**증상**: 프론트엔드에서 백엔드 API 호출 실패

**해결방법**:
1. 백엔드 `CLIENT_URL` 환경 변수 확인
2. 프론트엔드 URL과 정확히 일치해야 함
3. 프로토콜 확인 (`https://` 포함)

### 4. 파일 업로드가 안됨

**증상**: 첨부파일 업로드 실패

**해결방법**:
Railway의 파일시스템은 재시작 시 초기화됩니다. 영구 저장을 위해서는:

**옵션 1: Railway Volume 사용** (추천)
```javascript
// server/config/multer.js에서 경로 변경
const storage = multer.diskStorage({
  destination: '/app/data/uploads', // Railway Volume 경로
  // ...
});
```

Railway에서:
1. 백엔드 서비스 → **"Settings"** → **"Volumes"**
2. **"+ Add Volume"**
3. Mount Path: `/app/data`

**옵션 2: 클라우드 스토리지 사용** (더 나은 방법)
- AWS S3, Cloudflare R2 등 사용 (추가 설정 필요)

### 5. 메모리 부족

**증상**: 서비스가 자주 재시작됨

**해결방법**:
1. Railway 서비스 → **"Settings"** → **"Resources"**
2. 메모리 증가 (비용 증가할 수 있음)
3. 또는 코드 최적화:
   - 불필요한 로그 제거
   - 이미지 크기 제한
   - 캐싱 추가

---

## 📊 모니터링

### Railway 대시보드에서 확인

1. **Metrics** (무료):
   - CPU 사용량
   - 메모리 사용량
   - 네트워크 트래픽

2. **Logs** (실시간):
   ```
   서비스 클릭 → "Logs" 탭
   ```

3. **Deployments**:
   - 배포 기록
   - 빌드 시간
   - 성공/실패 상태

### 헬스체크 설정 (선택사항)

무료 서비스로 서버 상태 모니터링:
- UptimeRobot (https://uptimerobot.com)
- 백엔드 URL `/health` 체크
- 다운타임 시 이메일 알림

---

## 🚀 추가 최적화 (나중에)

사용자가 늘어나면 고려할 사항:

1. **CDN 추가**: Cloudflare (무료)
2. **Redis 캐싱**: Railway에서 추가 가능
3. **백업 자동화**: PostgreSQL 백업 스크립트
4. **성능 모니터링**: New Relic, DataDog
5. **로드 밸런싱**: 여러 인스턴스 실행

---

## ✅ 배포 체크리스트

### 배포 전
- [ ] GitHub 저장소에 코드 푸시
- [ ] `.env` 파일이 `.gitignore`에 포함됨
- [ ] JWT_SECRET 생성
- [ ] ENCRYPTION_KEY 생성
- [ ] Railway 계정 생성
- [ ] 신용카드 등록 (무료 크레딧)

### 배포 중
- [ ] PostgreSQL 서비스 생성
- [ ] 백엔드 서비스 생성
- [ ] 백엔드 환경 변수 설정
- [ ] 백엔드 도메인 생성
- [ ] 프론트엔드 서비스 생성
- [ ] 프론트엔드 환경 변수 설정
- [ ] 프론트엔드 도메인 생성
- [ ] 백엔드에 프론트엔드 URL 추가

### 배포 후
- [ ] `/health` 엔드포인트 테스트
- [ ] 프론트엔드 접속 테스트
- [ ] 회원가입/로그인 테스트
- [ ] 기능 전체 테스트
- [ ] 비용 모니터링 설정
- [ ] 업타임 모니터링 설정 (선택)

---

## 📞 도움이 필요하면

- **Railway 공식 문서**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **이 프로젝트 이슈**: GitHub Issues

---

**축하합니다! 🎉**  
이제 웹앱이 전 세계 어디서나 접속 가능합니다!

**배포 완료 시간**: 약 30-60분  
**예상 비용**: 월 $0-5 (무료 크레딧 범위 내)  
**사용자**: 10-30명 충분히 지원

---

마지막 업데이트: 2025-11-19

