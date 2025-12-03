# 🏗️ JAKUP - 건설 현장 관리 시스템

> Supabase + Vercel 기반의 현대적인 건설 현장 관리 솔루션

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

---

## 📌 개요

JAKUP은 건설 현장의 인력 관리, 작업 일지, 비용 관리를 효율적으로 수행할 수 있는 웹 애플리케이션입니다.

### 주요 기능

- 👥 **인력 관리**: 작업자 정보 관리 및 근태 기록
- 📝 **작업 일지**: 현장별 작업 내역 기록 및 조회
- 💰 **비용 관리**: 인건비 및 경비 자동 집계
- 📊 **현황 대시보드**: 실시간 현장 현황 모니터링
- 📎 **파일 첨부**: 작업 사진 및 문서 업로드 (Supabase Storage)
- 🔐 **권한 관리**: 관리자/작업반장 역할 기반 접근 제어

---

## 🛠️ 기술 스택

### Frontend
- React 18 (TypeScript)
- Styled Components
- React Router v6
- Axios
- Zustand (상태 관리)

### Backend
- Node.js + Express
- Sequelize ORM
- JWT 인증
- Multer (파일 업로드)

### Database & Storage
- Supabase (PostgreSQL)
- Supabase Storage (파일 저장)

### Deployment
- Vercel (Serverless)

---

## 🚀 빠른 시작

### 방법 1: Vercel 버튼으로 배포 (권장)

1. 위의 **"Deploy with Vercel"** 버튼 클릭
2. [QUICKSTART_VERCEL.md](./QUICKSTART_VERCEL.md) 가이드 따라하기
3. 5-10분 안에 배포 완료! 🎉

### 방법 2: 로컬 개발 환경 설정

#### 사전 준비
- Node.js 16.x 이상
- Supabase 계정 및 프로젝트

#### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/YOUR_USERNAME/jakup-project.git
cd jakup-project/jakupbanjang

# 2. 의존성 설치
npm run install-all

# 3. 환경 변수 설정
cp env.template server/.env
cp client/env.template client/.env

# 4. 환경 변수 편집 (DATABASE_URL, SUPABASE_* 등)
# server/.env 및 client/.env 파일 수정

# 5. 개발 서버 실행
npm run dev
```

서버: http://localhost:3001  
클라이언트: http://localhost:3000

---

## 📖 문서

- 📘 **[빠른 시작 가이드](./QUICKSTART_VERCEL.md)** - 5분 배포 가이드
- 📗 **[상세 배포 가이드](./VERCEL_SUPABASE_DEPLOYMENT.md)** - 단계별 상세 설명
- 📙 **[환경 변수 템플릿](./env.template)** - 필수 환경 변수 목록

---

## 🏗️ 프로젝트 구조

```
jakupbanjang/
├── api/                    # Vercel Serverless Functions
│   └── index.js           # API 엔트리 포인트
├── client/                # React 프론트엔드
│   ├── public/
│   └── src/
│       ├── api/           # API 클라이언트
│       ├── components/    # React 컴포넌트
│       ├── pages/         # 페이지 컴포넌트
│       ├── styles/        # 스타일 테마
│       └── utils/         # 유틸리티 함수
├── server/                # Express 백엔드
│   ├── config/           # 설정 (DB, Logger, Supabase)
│   ├── controllers/      # 비즈니스 로직
│   ├── middlewares/      # 미들웨어 (인증, 에러처리)
│   ├── models/           # Sequelize 모델
│   ├── routes/           # API 라우트
│   └── index.js          # 서버 엔트리 포인트
├── vercel.json           # Vercel 배포 설정
├── env.template          # 환경 변수 템플릿
└── package.json          # 프로젝트 메타데이터
```

---

## 🔐 환경 변수

### 서버 환경 변수 (server/.env)

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@...
JWT_SECRET=your-secret-key
CLIENT_URL=https://your-app.vercel.app
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGc...
SUPABASE_STORAGE_BUCKET=jakup-attachments
NODE_ENV=production
```

### 클라이언트 환경 변수 (client/.env)

```env
REACT_APP_API_URL=https://your-app.vercel.app/api
```

자세한 내용은 [env.template](./env.template) 참고

---

## 🧪 테스트

```bash
# 서버 테스트
cd server
npm test

# 테스트 커버리지
npm run test:coverage
```

---

## 📦 배포

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

또는 GitHub 연동으로 자동 배포

---

## 🔧 문제해결

### 데이터베이스 연결 오류
```bash
# 연결 테스트
curl https://your-app.vercel.app/health
```

### CORS 에러
- `CLIENT_URL` 환경 변수를 실제 배포 URL로 설정
- Vercel에서 환경 변수 수정 후 **Redeploy** 필수

### 파일 업로드 실패
- Supabase Storage bucket이 **Public**인지 확인
- `SUPABASE_URL`, `SUPABASE_KEY` 확인

자세한 문제해결은 [VERCEL_SUPABASE_DEPLOYMENT.md](./VERCEL_SUPABASE_DEPLOYMENT.md#6-문제해결) 참고

---

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

MIT License - 자유롭게 사용하세요!

---

## 👥 팀

JAKUP Development Team

---

## 🙏 감사의 말

- [Supabase](https://supabase.com/) - PostgreSQL 호스팅 및 Storage
- [Vercel](https://vercel.com/) - 서버리스 배포 플랫폼
- [React](https://reactjs.org/) - UI 프레임워크
- [Express](https://expressjs.com/) - 백엔드 프레임워크

---

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 등록해주세요!

**[Issues](https://github.com/YOUR_USERNAME/jakup-project/issues)**

---

<div align="center">
Made with ❤️ by JAKUP Team
</div>

