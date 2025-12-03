# ⚡ JAKUP - 빠른 시작 가이드 (Vercel + Supabase)

> 5-10분 안에 JAKUP 프로젝트를 Vercel과 Supabase에 배포하는 빠른 가이드입니다.

## 🤔 이게 뭔가요?

간단히 말하면:
- **Supabase** = 무료 데이터베이스 + 파일 저장소 (Google Drive 같은 것)
- **Vercel** = 무료 웹사이트 호스팅 (내 사이트를 인터넷에 올림)

### 해야 할 일 요약:
1. ✅ Supabase에서 데이터베이스 만들기 (3분)
2. ✅ GitHub에 코드 올리기 (2분)
3. ✅ Vercel에서 웹사이트 배포하기 (5분)

### 필요한 것:
- ☁️ Supabase 계정 (무료 가입)
- ☁️ Vercel 계정 (무료 가입)
- 🐙 GitHub 계정

---

## 🎯 1단계: Supabase 프로젝트 생성 (3분)

### 1.1 프로젝트 생성
1. https://supabase.com/ 접속 후 로그인
2. **"New Project"** 클릭
3. 정보 입력:
   - Name: `jakup-project`
   - Password: **강력한 비밀번호 생성 및 저장** 🔐
   - Region: `Northeast Asia (Seoul)`
4. **"Create new project"** 클릭 (2-3분 대기)

### 1.2 Storage Bucket 생성
1. 왼쪽 메뉴 **Storage** 클릭
2. **"Create a new bucket"** 클릭
3. Name: `jakup-attachments`, **Public bucket** 체크 ✅
4. **"Create bucket"** 클릭

### 1.3 데이터베이스 접속 정보 준비 📋

> ⚠️ **Connection String을 못 찾겠다면?** → **방법 3: 직접 만들기**가 가장 쉽습니다!

#### ⚡ Connection String 만들기 (DATABASE_URL)

**🎯 방법 3: 직접 만들기** (권장! 가장 쉬움)

1. **프로젝트 ID 확인:**
   - 브라우저 주소창 보기: `https://supabase.com/dashboard/project/[여기!]`
   - 예시: `xyzabc123defg`

2. **데이터베이스 비밀번호 확인:**
   - 1.1단계에서 입력한 비밀번호
   - 잊어버렸다면: Project Settings > Database > Reset Database Password

3. **조합하기:**
   ```
   postgresql://postgres:[비밀번호]@db.[프로젝트ID].supabase.co:5432/postgres
   ```

**✅ 예시:**
```
프로젝트 ID: xyzabc123defg
비밀번호: MySecret123!

결과:
postgresql://postgres:MySecret123!@db.xyzabc123defg.supabase.co:5432/postgres
```

---

**방법 1: Project Settings에서 찾기** (Connection String이 보인다면)

**방법 1: Project Settings에서 찾기** (최신 Supabase UI)

1. Supabase 프로젝트 대시보드 왼쪽 아래에서 **⚙️ Project Settings** 클릭
2. 왼쪽 메뉴에서 **Database** 클릭
3. 페이지를 **아래로 스크롤**하면 **Connection string** 섹션이 보입니다
4. 여러 탭이 보이는데 **`URI`** 탭 선택 (Session mode 또는 Nodejs 아님!)
5. 다음과 같은 형식의 문자열이 표시됩니다:

```
postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres
```

또는

```
postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijk.supabase.co:5432/postgres
```

6. **📋 복사** 아이콘 클릭 (문자열 옆에 있음)
7. 메모장에 붙여넣기

**방법 2: Database 메뉴에서 찾기** (이전 UI)

1. 왼쪽 메뉴 맨 위에서 **Database** (데이터베이스 아이콘) 클릭
2. 상단 탭에서 **Connect** 클릭
3. **Connection string** 선택
4. **URI** 복사

**⚠️ 못 찾겠다면 직접 만들기:**

아래 템플릿에 정보를 채워넣으세요:

```
postgresql://postgres:[비밀번호]@db.[프로젝트ID].supabase.co:5432/postgres
```

**프로젝트 ID 찾기:**
- Supabase 대시보드 URL을 보세요
- `https://supabase.com/dashboard/project/abcdefghijk`
- 여기서 `abcdefghijk` 부분이 프로젝트 ID입니다

**✅ 예시:**
```
프로젝트 ID: abcdefghijk
비밀번호: MySecret123!

최종 결과:
postgresql://postgres:MySecret123!@db.abcdefghijk.supabase.co:5432/postgres
```

**🔐 비밀번호를 잊어버렸다면?**
1. Project Settings > Database
2. **Database password** 섹션에서 **Reset Database Password** 클릭
3. 새 비밀번호 생성 및 저장

---

#### ⚡ Supabase API 정보 준비하기

**🎯 SUPABASE_URL 만들기** (쉬움!)

위에서 확인한 프로젝트 ID를 사용:
```
https://[프로젝트ID].supabase.co
```

**예시:**
```
프로젝트 ID: xyzabc123defg
SUPABASE_URL: https://xyzabc123defg.supabase.co
```

---

**🔑 SUPABASE_KEY 찾기** (복사 필요)

1. ⚙️ **Project Settings** (왼쪽 하단) 클릭
2. 왼쪽 메뉴에서 **API** 클릭
3. **Project API keys** 섹션 찾기
4. **`anon`** **`public`** 키 찾기 (service_role 아님!)
5. 👁️ (눈 모양) 클릭하면 보임
6. 📋 복사 버튼 클릭

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (매우 긴 문자열, 약 200자 이상)
```

**⚠️ API 페이지가 안 보이거나 키가 없다면:**
- 프로젝트가 아직 생성 중일 수 있습니다 (2-3분 대기)
- 페이지를 새로고침 해보세요
- 여전히 안 보이면 프로젝트를 다시 만들어야 할 수 있습니다

---

## 🚀 2단계: Vercel 배포 (5분)

### 2.1 GitHub에 푸시

```bash
cd jakupbanjang
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jakup-project.git
git push -u origin main
```

### 2.2 Vercel 프로젝트 임포트

1. https://vercel.com/dashboard 접속
2. **"Add New" > "Project"** 클릭
3. GitHub 저장소 `jakup-project` 선택
4. **Configure Project**:
   - **Root Directory**: `jakupbanjang` 입력 ⚠️
   - **Build Command**: 
     ```bash
     cd server && npm install && cd ../client && npm install && npm run build
     ```
   - **Output Directory**: `client/build`

### 2.3 환경 변수 설정 (중요! ⚠️)

Vercel 프로젝트 생성 화면에서 **아래로 스크롤**하면 **Environment Variables** 섹션이 나옵니다.

#### 🔴 단계 1: JWT_SECRET 생성하기

먼저 보안 키를 생성해야 합니다.

**Windows PowerShell에서 실행:**
```powershell
-join ((33..126) | Get-Random -Count 32 | % {[char]$_})
```

**결과 예시:** `aB3$xY9@mK2#pL7!qR4%wT8&nZ5^jH6*`

👆 이 문자열을 복사해서 메모장에 저장하세요!

---

#### 🔴 단계 2: 환경 변수 하나씩 추가하기

**각 환경 변수를 다음과 같이 입력:**

1️⃣ **DATABASE_URL**
- Name: `DATABASE_URL`
- Value: 1.3단계에서 복사한 Connection String (비밀번호 포함된 것!)
- Environment: Production ✅, Preview ✅, Development ✅ (3개 모두 체크)

```
예시: postgresql://postgres:MySecret123!@db.abcdefghijk.supabase.co:5432/postgres
```

2️⃣ **JWT_SECRET**
- Name: `JWT_SECRET`
- Value: 위에서 생성한 랜덤 문자열
- Environment: 3개 모두 체크 ✅

```
예시: aB3$xY9@mK2#pL7!qR4%wT8&nZ5^jH6*
```

3️⃣ **SUPABASE_URL**
- Name: `SUPABASE_URL`
- Value: 1.3단계에서 복사한 Project URL
- Environment: 3개 모두 체크 ✅

```
예시: https://abcdefghijk.supabase.co
```

4️⃣ **SUPABASE_KEY**
- Name: `SUPABASE_KEY`
- Value: 1.3단계에서 복사한 anon public key (매우 긴 문자열)
- Environment: 3개 모두 체크 ✅

```
예시: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
```

5️⃣ **SUPABASE_STORAGE_BUCKET**
- Name: `SUPABASE_STORAGE_BUCKET`
- Value: `jakup-attachments`
- Environment: 3개 모두 체크 ✅

6️⃣ **NODE_ENV**
- Name: `NODE_ENV`
- Value: `production`
- Environment: **Production만** 체크 ✅

---

#### 🟢 단계 3: 클라이언트 환경 변수 (나중에 추가)

⚠️ **첫 배포 시에는 건너뛰세요!** 배포 완료 후 추가합니다.

배포 완료 후 Vercel이 준 URL (예: `https://jakup-abc123.vercel.app`)을 받으면:

7️⃣ **REACT_APP_API_URL**
- Name: `REACT_APP_API_URL`
- Value: `https://jakup-abc123.vercel.app/api` (실제 URL 사용)
- Environment: 3개 모두 체크 ✅

8️⃣ **CLIENT_URL**
- Name: `CLIENT_URL`
- Value: `https://jakup-abc123.vercel.app` (실제 URL 사용)
- Environment: 3개 모두 체크 ✅

그 다음 **Vercel Dashboard > Deployments > 최신 배포 > ... > Redeploy** 클릭!

### 2.4 배포 시작

**"Deploy"** 버튼 클릭 → 3-5분 대기 → **"Visit"** 클릭

---

## ✅ 3단계: 배포 확인 (2분)

### 3.1 헬스체크

```
https://your-app.vercel.app/health
```

✅ 정상 응답:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### 3.2 회원가입 테스트

1. 메인 페이지 → **회원가입**
2. 관리자 계정 생성 (이메일 + 기업명)
3. 로그인 성공 확인 ✅

### 3.3 Supabase 데이터 확인

Supabase 대시보드 → **Table Editor** → `companies`, `users` 테이블 확인

---

## 🔧 문제해결

### ❌ "Unable to connect to database"
→ Vercel 환경 변수에서 `DATABASE_URL` 확인 (비밀번호 포함)

### ❌ CORS 에러
→ `CLIENT_URL` 환경 변수를 실제 Vercel URL로 설정 후 Redeploy

### ❌ 파일 업로드 실패
→ Supabase Storage bucket이 **Public**인지 확인

---

## 📚 다음 단계

- 📖 상세 가이드: [VERCEL_SUPABASE_DEPLOYMENT.md](./VERCEL_SUPABASE_DEPLOYMENT.md)
- 🔒 보안 강화: JWT_SECRET 주기적 변경
- 📊 모니터링: Vercel Analytics, Supabase Dashboard

---

## 🎉 완료!

축하합니다! JAKUP 프로젝트가 성공적으로 배포되었습니다.

**배포 URL**: https://your-app.vercel.app

궁금한 점이 있으면 상세 가이드를 참고하세요.

