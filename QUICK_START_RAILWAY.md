# 🚀 Railway 배포 빠른 시작 가이드

**총 소요 시간**: 30-60분  
**비용**: 월 $0-5 (무료 크레딧 범위 내)

---

## 📝 1단계: 보안 키 생성 (5분)

### PowerShell 또는 CMD를 열고 실행:

```bash
# 프로젝트 디렉토리로 이동
cd "C:\Users\ehdrj\OneDrive\Desktop\JAKUP VER.1\jakupbanjang"

# JWT Secret 생성
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**결과를 복사해서 메모장에 저장**:
```
JWT_SECRET = ecc72acd4da2aa80dc3e298da93f3d47b843edfcf35f26cc58f9317acf0b93f6
```

```bash
# Encryption Key 생성
node -e "console.log(Buffer.from(require('crypto').randomBytes(32)).toString('base64'))"
```

**결과를 복사해서 메모장에 저장**:
```
ENCRYPTION_KEY = j9VORsq+tU7eNCpoUfbv7qYvVKmJJhtqabGEiUXEzhI=
```

---

## 🐙 2단계: GitHub에 업로드 (10분)

### 2-1. GitHub 저장소 생성
1. https://github.com/new 접속
2. **Repository name**: `jakup-project` (원하는 이름)
3. **Private** 선택 (중요!)
4. **Create repository** 클릭

### 2-2. 코드 업로드

```bash
# Git 초기화 (처음이라면)
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit for deployment"

# 원격 저장소 연결 (GitHub에서 복사한 URL)
git remote add origin https://github.com/your-username/jakup-project.git

# 푸시
git branch -M main
git push -u origin main
```

**⚠️ 중요**: `.env` 파일은 절대 업로드되지 않도록 확인!

---

## 🚂 3단계: Railway 설정 (20분)

### 3-1. Railway 회원가입
1. https://railway.app 접속
2. **"Login with GitHub"** 클릭
3. GitHub 계정 연동

### 3-2. 신용카드 등록 (무료 크레딧 받기)
1. 대시보드 → 우측 상단 프로필 → **"Account"**
2. **"Billing"** → 신용카드 등록
3. **월 $5 무료 크레딧** 자동 적용
4. 💡 자동 결제 안됨! 크레딧 소진 시 알림만 옴

### 3-3. 새 프로젝트 생성
1. **"New Project"** 클릭
2. **"Deploy from GitHub repo"** 선택
3. GitHub 권한 승인
4. `jakup-project` 저장소 선택

---

## 🗄️ 4단계: 데이터베이스 추가 (3분)

1. 프로젝트 화면에서 **"+ New"** 클릭
2. **"Database"** 선택
3. **"Add PostgreSQL"** 클릭
4. 자동으로 생성됨! ✅

---

## 🖥️ 5단계: 백엔드 배포 (10분)

### 5-1. 백엔드 서비스 설정
1. GitHub 저장소를 추가했을 때 생성된 서비스 클릭
2. 서비스 이름 변경: **"backend"** (우측 상단 톱니바퀴 아이콘)

### 5-2. Root Directory 설정
1. **"Settings"** 탭
2. **"Source"** 섹션 찾기
3. **"Root Directory"**: `server` 입력
4. **"Service"** 섹션에서 **"Check logs"** 체크

### 5-3. 환경 변수 설정
1. **"Variables"** 탭 클릭
2. **"+ New Variable"** 클릭하여 하나씩 추가:

#### 일반 환경 변수:
```
NODE_ENV = production
PORT = 3001
```

#### 보안 키 (1단계에서 생성한 것):
```
JWT_SECRET = (1단계에서 생성한 JWT_SECRET)
ENCRYPTION_KEY = (1단계에서 생성한 ENCRYPTION_KEY)
```

#### 데이터베이스 연결:
1. `DATABASE_URL` 변수 추가 시:
2. 우측의 **"+ New Variable"** 대신 **"+ Reference"** 클릭
3. PostgreSQL 서비스 선택
4. `DATABASE_URL` 선택

#### CLIENT_URL (나중에 추가):
```
CLIENT_URL = (7단계에서 추가)
```

### 5-4. 백엔드 도메인 생성
1. **"Settings"** 탭
2. **"Networking"** 섹션
3. **"Generate Domain"** 클릭
4. **생성된 URL 복사** (예: `https://backend-production-xxxx.up.railway.app`)
5. **메모장에 저장**: `BACKEND_URL = 복사한_URL`

### 5-5. 배포 확인
1. **"Deployments"** 탭에서 진행 상황 확인
2. 3-5분 후 ✅ 표시되면 성공
3. 브라우저에서 테스트:
   ```
   https://your-backend-url.up.railway.app/health
   ```
4. 응답이 나오면 성공! 🎉

---

## 🎨 6단계: 프론트엔드 배포 (10분)

### 6-1. 프론트엔드 서비스 추가
1. 프로젝트 화면에서 **"+ New"** 클릭
2. **"GitHub Repo"** 선택
3. **같은 저장소** (`jakup-project`) 선택
4. **"Add Service"** 클릭

### 6-2. 프론트엔드 서비스 설정
1. 새로 생성된 서비스 클릭
2. 서비스 이름 변경: **"frontend"**

### 6-3. Root Directory 설정
1. **"Settings"** 탭
2. **"Root Directory"**: `client` 입력

### 6-4. 환경 변수 설정
1. **"Variables"** 탭
2. 변수 추가:

```
REACT_APP_API_URL = (5단계에서 복사한 백엔드 URL)
```

예시: `https://backend-production-xxxx.up.railway.app`

### 6-5. 프론트엔드 도메인 생성
1. **"Settings"** 탭
2. **"Networking"** 섹션
3. **"Generate Domain"** 클릭
4. **생성된 URL 복사** (예: `https://frontend-production-xxxx.up.railway.app`)
5. **메모장에 저장**: `FRONTEND_URL = 복사한_URL`

### 6-6. 배포 확인
1. **"Deployments"** 탭에서 진행 상황 확인
2. 5-10분 후 ✅ 표시되면 성공
3. 브라우저에서 프론트엔드 URL 접속
4. 로그인 페이지가 보이면 성공! 🎉

---

## 🔗 7단계: CORS 설정 (3분)

백엔드가 프론트엔드 요청을 받을 수 있도록 설정:

1. **백엔드 서비스**로 돌아가기
2. **"Variables"** 탭
3. `CLIENT_URL` 변수 추가 또는 수정:
   ```
   CLIENT_URL = (6단계에서 복사한 프론트엔드 URL)
   ```
   예시: `https://frontend-production-xxxx.up.railway.app`
4. 저장하면 자동으로 재배포됨 (1-2분 소요)

---

## ✅ 8단계: 최종 테스트 (5분)

### 8-1. 백엔드 테스트
```
https://your-backend-url.up.railway.app/health
```
✅ 응답: `{"status":"healthy",...}`

### 8-2. 프론트엔드 접속
```
https://your-frontend-url.up.railway.app
```
✅ 로그인 페이지 표시

### 8-3. 전체 기능 테스트
1. **회원가입** - 새 계정 생성
2. **로그인** - 생성한 계정으로 로그인
3. **대시보드** - 정상 표시
4. **작업 생성** - 새 작업 추가
5. **작업 조회** - 작업 목록 확인

모든 기능이 정상 작동하면 **배포 완료!** 🎉🎉🎉

---

## 📱 완성된 URL 정리

배포가 완료되면 다음 2개의 URL을 갖게 됩니다:

```
프론트엔드 (사용자 접속):
https://frontend-production-xxxx.up.railway.app

백엔드 (API):
https://backend-production-xxxx.up.railway.app
```

**이 URL들을 팀원들과 공유하세요!**

---

## 🔄 코드 업데이트 방법

코드를 수정한 후:

```bash
# 변경사항 커밋
git add .
git commit -m "업데이트 내용"

# GitHub에 푸시
git push

# Railway가 자동으로 감지하고 재배포 시작! (5분 소요)
```

---

## 💰 비용 확인

1. Railway 대시보드
2. 우측 상단 프로필 → **"Usage"**
3. 현재 사용량 확인
4. 예상 비용: **월 $3-5** (무료 크레딧으로 충분)

---

## 🚨 문제 발생 시

### 배포가 실패하는 경우
1. Railway 서비스 → **"Deployments"** → 빨간색 X 클릭
2. **"View Logs"** 클릭
3. 에러 메시지 확인
4. 대부분의 경우:
   - 환경 변수 누락 → 다시 확인
   - Root Directory 잘못 설정 → `server` 또는 `client` 확인

### CORS 에러가 나는 경우
1. 백엔드 서비스 → **"Variables"**
2. `CLIENT_URL`이 정확한 프론트엔드 URL인지 확인
3. `https://` 포함되었는지 확인

### 데이터베이스 연결 실패
1. 백엔드 서비스 → **"Variables"**
2. `DATABASE_URL`이 PostgreSQL과 연결되었는지 확인
3. Reference 변수로 설정되어야 함

---

## 📚 추가 자료

- **상세 가이드**: `RAILWAY_DEPLOYMENT.md` 파일 참고
- **Railway 공식 문서**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway

---

## 🎉 축하합니다!

이제 여러분의 작업관리 시스템이 **전 세계 어디서나 접속 가능**합니다!

- ✅ 자동 SSL (HTTPS)
- ✅ 자동 백업 (PostgreSQL)
- ✅ 자동 재시작 (장애 복구)
- ✅ 자동 배포 (GitHub 푸시)

**URL을 팀원들에게 공유하고 사용을 시작하세요!** 🚀

---

마지막 업데이트: 2025-11-19

