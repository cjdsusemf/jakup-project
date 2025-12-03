# 🚀 JAKUP 프로젝트 - Vercel & Supabase 배포 가이드

이 가이드는 JAKUP 프로젝트를 **Supabase**(PostgreSQL) 데이터베이스와 **Vercel** 플랫폼에 배포하는 방법을 설명합니다.

---

## 📋 목차

1. [사전 준비사항](#1-사전-준비사항)
2. [Supabase 설정](#2-supabase-설정)
3. [로컬 개발 환경 설정](#3-로컬-개발-환경-설정)
4. [Vercel 배포](#4-vercel-배포)
5. [배포 후 확인사항](#5-배포-후-확인사항)
6. [문제해결](#6-문제해결)

---

## 1. 사전 준비사항

### 필수 계정 및 도구

- ✅ [Supabase](https://supabase.com/) 계정 (무료)
- ✅ [Vercel](https://vercel.com/) 계정 (무료)
- ✅ Git 및 GitHub 계정
- ✅ Node.js 16.x 이상

### 프로젝트 구조

```
jakupbanjang/
├── client/          # React 프론트엔드
├── server/          # Express 백엔드
├── vercel.json      # Vercel 배포 설정
└── env.template     # 환경 변수 템플릿
```

---

## 2. Supabase 설정

### 2.1 새 프로젝트 생성

1. [Supabase 대시보드](https://app.supabase.com/)에 로그인
2. **"New Project"** 클릭
3. 프로젝트 정보 입력:
   - **Name**: `jakup-project`
   - **Database Password**: 강력한 비밀번호 생성 (⚠️ 반드시 저장!)
   - **Region**: `Northeast Asia (Seoul)` 권장
4. **"Create new project"** 클릭 (약 2-3분 소요)

### 2.2 데이터베이스 연결 정보 확인

1. 프로젝트 대시보드에서 **Settings** > **Database** 선택
2. **Connection String** 섹션에서 **URI** 복사
   - 형식: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`
   - `[YOUR-PASSWORD]`를 실제 비밀번호로 교체

### 2.3 Supabase Storage 설정

1. 왼쪽 메뉴에서 **Storage** 클릭
2. **"Create a new bucket"** 클릭
3. Bucket 정보 입력:
   - **Name**: `jakup-attachments`
   - **Public bucket**: ✅ 체크 (파일 다운로드를 위해 필요)
4. **"Create bucket"** 클릭

### 2.4 API 키 확인

1. **Settings** > **API** 선택
2. 다음 정보 복사:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGc...` (긴 문자열)

---

## 3. 로컬 개발 환경 설정

### 3.1 서버 환경 변수 설정

1. `jakupbanjang/server/` 디렉토리에 `.env` 파일 생성:

```bash
cd jakupbanjang/server
cp ../env.template .env
```

2. `.env` 파일 편집:

```env
# 서버 설정
PORT=3001
NODE_ENV=development

# Supabase PostgreSQL
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres

# JWT 인증 (아래 명령으로 생성)
# PowerShell: -join ((33..126) | Get-Random -Count 32 | % {[char]$_})
# Linux/Mac: openssl rand -base64 32
JWT_SECRET=your-generated-secret-here

# 클라이언트 URL
CLIENT_URL=http://localhost:3000

# Supabase Storage
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGc...your-anon-key...
SUPABASE_STORAGE_BUCKET=jakup-attachments
```

### 3.2 클라이언트 환경 변수 설정

1. `jakupbanjang/client/` 디렉토리에 `.env` 파일 생성:

```bash
cd jakupbanjang/client
cp env.template .env
```

2. `.env` 파일 편집:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

### 3.3 의존성 설치

```bash
# 서버 의존성 설치
cd jakupbanjang/server
npm install

# 클라이언트 의존성 설치
cd ../client
npm install
```

### 3.4 데이터베이스 동기화

서버를 처음 실행하면 Sequelize가 자동으로 테이블을 생성합니다:

```bash
cd jakupbanjang/server
npm run dev
```

콘솔에 다음 메시지가 표시되면 성공:
```
✅ Supabase PostgreSQL connection established successfully.
Database synchronized
Server is running on port 3001
```

### 3.5 로컬 테스트

1. 서버 실행: `cd server && npm run dev`
2. 클라이언트 실행: `cd client && npm start`
3. 브라우저에서 `http://localhost:3000` 접속

---

## 4. Vercel 배포

### 4.1 GitHub에 프로젝트 푸시

```bash
cd jakupbanjang
git init
git add .
git commit -m "Initial commit for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jakup-project.git
git push -u origin main
```

### 4.2 Vercel에 프로젝트 임포트

1. [Vercel 대시보드](https://vercel.com/dashboard)에 로그인
2. **"Add New"** > **"Project"** 클릭
3. GitHub 저장소에서 `jakup-project` 선택
4. **Configure Project** 설정:

#### Root Directory
- **Root Directory**: `jakupbanjang` 입력

#### Framework Preset
- **Framework Preset**: Other (변경 없음)

#### Build and Output Settings
- **Build Command**: 
  ```bash
  cd server && npm install && cd ../client && npm install && npm run build
  ```
- **Output Directory**: `client/build`
- **Install Command**: `npm install` (기본값)

### 4.3 환경 변수 설정

Vercel 프로젝트 설정에서 **Settings** > **Environment Variables** 선택 후 추가:

#### 서버 환경 변수 (모든 환경에 추가)

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | `postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres` | Production, Preview, Development |
| `JWT_SECRET` | `your-generated-secret` | Production, Preview, Development |
| `CLIENT_URL` | `https://your-app.vercel.app` | Production |
| `CLIENT_URL` | `http://localhost:3000` | Development |
| `SUPABASE_URL` | `https://xxxxx.supabase.co` | Production, Preview, Development |
| `SUPABASE_KEY` | `eyJhbGc...` | Production, Preview, Development |
| `SUPABASE_STORAGE_BUCKET` | `jakup-attachments` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

#### 클라이언트 환경 변수

| Name | Value | Environment |
|------|-------|-------------|
| `REACT_APP_API_URL` | `https://your-app.vercel.app/api` | Production |

⚠️ **주의**: `your-app.vercel.app`를 실제 Vercel 배포 URL로 교체하세요.

### 4.4 배포 시작

1. **"Deploy"** 버튼 클릭
2. 빌드 프로세스 모니터링 (약 3-5분 소요)
3. 배포 완료 후 **"Visit"** 버튼으로 사이트 확인

---

## 5. 배포 후 확인사항

### 5.1 데이터베이스 연결 확인

배포된 사이트의 `/health` 엔드포인트 접속:
```
https://your-app.vercel.app/health
```

정상 응답 예시:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2024-12-03T..."
}
```

### 5.2 회원가입 테스트

1. 사이트 메인 페이지에서 **"회원가입"** 클릭
2. 관리자 계정 생성:
   - 이메일과 비밀번호 입력
   - 기업명 입력
   - 회원가입 완료
3. 로그인 테스트

### 5.3 Supabase 데이터 확인

1. Supabase 대시보드 > **Table Editor** 선택
2. `companies`, `users` 테이블에 데이터가 생성되었는지 확인

### 5.4 파일 업로드 테스트

1. 작업 생성
2. 첨부파일 업로드
3. Supabase Storage에 파일이 업로드되었는지 확인:
   - **Storage** > **jakup-attachments** > **attachments/** 폴더 확인

---

## 6. 문제해결

### ❌ 데이터베이스 연결 오류

**증상**: "Unable to connect to the database" 에러

**해결책**:
1. Vercel 환경 변수에서 `DATABASE_URL` 확인
2. Supabase 비밀번호가 올바른지 확인
3. Supabase 프로젝트가 활성 상태인지 확인

### ❌ CORS 에러

**증상**: "Access to XMLHttpRequest has been blocked by CORS policy"

**해결책**:
1. 서버 `index.js`의 `CLIENT_URL` 환경 변수 확인
2. Vercel에서 `CLIENT_URL`이 올바르게 설정되었는지 확인

### ❌ 파일 업로드 실패

**증상**: "파일 업로드에 실패했습니다"

**해결책**:
1. Supabase Storage bucket이 **Public**으로 설정되었는지 확인
2. `SUPABASE_URL`, `SUPABASE_KEY` 환경 변수 확인
3. Bucket 이름이 `jakup-attachments`로 정확한지 확인

### ❌ 빌드 실패

**증상**: Vercel 배포 시 빌드 에러

**해결책**:
1. 로컬에서 빌드 테스트:
   ```bash
   cd client
   npm run build
   ```
2. TypeScript 에러가 있다면 수정 후 재배포
3. Vercel 로그에서 상세 에러 메시지 확인

### ❌ 환경 변수가 적용되지 않음

**해결책**:
1. Vercel 설정에서 환경 변수가 올바른 환경(Production/Preview/Development)에 추가되었는지 확인
2. 환경 변수 수정 후 **Redeploy** 필요 (Deployments > ... > Redeploy)

---

## 📚 추가 자료

- [Supabase 문서](https://supabase.com/docs)
- [Vercel 문서](https://vercel.com/docs)
- [Sequelize PostgreSQL 가이드](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/#postgresql)

---

## 🎉 배포 완료!

축하합니다! JAKUP 프로젝트가 성공적으로 배포되었습니다.

### 다음 단계:
- 🔐 JWT_SECRET을 주기적으로 변경
- 📊 Supabase 대시보드에서 데이터베이스 모니터링
- 🚀 Vercel Analytics로 사이트 성능 추적
- 🔒 Supabase RLS(Row Level Security) 정책 검토

문제가 발생하면 위의 문제해결 섹션을 참고하거나 이슈를 등록해주세요.

