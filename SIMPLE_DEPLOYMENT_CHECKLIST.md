# ✅ JAKUP 배포 간단 체크리스트

> 복사-붙여넣기만 하면 되는 초간단 가이드

---

## 📋 1단계: 정보 수집하기 (메모장에 정리)

### Supabase에서 가져올 정보:

```
=== 내 JAKUP 배포 정보 ===

□ Supabase 프로젝트 생성 완료
  - 프로젝트명: jakup-project
  - 비밀번호: _________________ (저장!)

□ 프로젝트 ID 확인
  - 브라우저 주소창: https://supabase.com/dashboard/project/[여기!]
  - 내 프로젝트 ID: _________________

□ DATABASE_URL 만들기
  postgresql://postgres:[내비밀번호]@db.[내프로젝트ID].supabase.co:5432/postgres
  
  내 DATABASE_URL: 
  _________________________________________________________________

□ SUPABASE_URL 만들기
  https://[내프로젝트ID].supabase.co
  
  내 SUPABASE_URL:
  _________________________________________________________________

□ SUPABASE_KEY 복사
  - Project Settings > API > anon public 키 복사
  
  내 SUPABASE_KEY:
  _________________________________________________________________

□ Storage Bucket 생성
  - 이름: jakup-attachments
  - Public bucket: ✅ 체크

□ JWT_SECRET 생성
  - PowerShell 실행: -join ((33..126) | Get-Random -Count 32 | % {[char]$_})
  
  내 JWT_SECRET:
  _________________________________________________________________
```

---

## 🚀 2단계: Vercel 환경 변수 입력

Vercel 프로젝트 생성 화면에서 **Environment Variables**에 다음을 입력:

### 체크리스트:

```
□ DATABASE_URL
  Name: DATABASE_URL
  Value: [위에서 만든 DATABASE_URL 붙여넣기]
  ✅ Production ✅ Preview ✅ Development

□ JWT_SECRET
  Name: JWT_SECRET
  Value: [위에서 생성한 JWT_SECRET 붙여넣기]
  ✅ Production ✅ Preview ✅ Development

□ SUPABASE_URL
  Name: SUPABASE_URL
  Value: [위에서 만든 SUPABASE_URL 붙여넣기]
  ✅ Production ✅ Preview ✅ Development

□ SUPABASE_KEY
  Name: SUPABASE_KEY
  Value: [위에서 복사한 SUPABASE_KEY 붙여넣기]
  ✅ Production ✅ Preview ✅ Development

□ SUPABASE_STORAGE_BUCKET
  Name: SUPABASE_STORAGE_BUCKET
  Value: jakup-attachments
  ✅ Production ✅ Preview ✅ Development

□ NODE_ENV
  Name: NODE_ENV
  Value: production
  ✅ Production만 체크
```

---

## ✅ 3단계: 배포 후 추가 설정

배포가 완료되면 Vercel이 URL을 줍니다 (예: https://jakup-abc123.vercel.app)

```
내 Vercel URL: _________________________________________________
```

### Vercel에 환경 변수 2개 추가:

```
□ REACT_APP_API_URL
  Name: REACT_APP_API_URL
  Value: [내Vercel URL]/api
  예시: https://jakup-abc123.vercel.app/api
  ✅ Production ✅ Preview ✅ Development

□ CLIENT_URL
  Name: CLIENT_URL
  Value: [내Vercel URL]
  예시: https://jakup-abc123.vercel.app
  ✅ Production ✅ Preview ✅ Development

□ Vercel에서 Redeploy 버튼 클릭
```

---

## 🎯 빠른 확인

### ✅ 성공 확인:

```
□ https://[내Vercel URL]/health 접속
  → "status": "healthy" 표시되면 성공!

□ 메인 페이지에서 회원가입 테스트

□ 로그인 테스트

□ 작업 생성 및 파일 업로드 테스트
```

---

## 🆘 문제 해결 빠른 참고

### DATABASE_URL 오류
```
✗ 증상: "Unable to connect to database"
✓ 해결: 비밀번호가 정확한지 확인
        특수문자가 있으면 URL 인코딩 필요할 수 있음
```

### 파일 업로드 실패
```
✗ 증상: "파일 업로드 실패"
✓ 해결: Supabase Storage > jakup-attachments > Public 확인
```

### CORS 에러
```
✗ 증상: "CORS policy error"
✓ 해결: CLIENT_URL을 실제 Vercel URL로 설정했는지 확인
        환경 변수 변경 후 Redeploy 필수!
```

---

## 📚 더 자세한 설명이 필요하면?

- [QUICKSTART_VERCEL.md](./QUICKSTART_VERCEL.md) - 단계별 설명
- [VERCEL_SUPABASE_DEPLOYMENT.md](./VERCEL_SUPABASE_DEPLOYMENT.md) - 완전 상세 가이드

---

<div align="center">

**이 체크리스트를 인쇄해서 하나씩 체크하면서 진행하세요!** ✅

</div>

