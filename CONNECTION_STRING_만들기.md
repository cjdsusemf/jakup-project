# 🔧 Supabase Connection String 직접 만들기

> Connection String을 못 찾겠다면 직접 만드세요! (더 쉽습니다)

---

## ✅ 필요한 정보 2가지만 확인하세요

### 1️⃣ 프로젝트 ID 확인하기

**방법 1: 브라우저 주소창 보기** (가장 쉬움!)

Supabase 대시보드에 있을 때 브라우저 주소창을 보세요:

```
https://supabase.com/dashboard/project/xyzabc123defg
                                      ^^^^^^^^^^^^^^
                                      이 부분이 프로젝트 ID!
```

**방법 2: Project Settings 보기**

1. 왼쪽 하단 ⚙️ **Project Settings** 클릭
2. **General** 탭
3. **Reference ID** 또는 **Project ID** 확인

```
내 프로젝트 ID: _______________________________
```

---

### 2️⃣ 데이터베이스 비밀번호 확인하기

**프로젝트 만들 때 입력한 Database Password**

⚠️ **비밀번호를 잊어버렸다면?**

1. ⚙️ Project Settings > Database
2. **Database Password** 섹션 찾기
3. **Reset Database Password** 클릭
4. 새 비밀번호 생성 후 **저장!**

```
내 DB 비밀번호: _______________________________
```

---

## 🎯 Connection String 만들기

아래 템플릿에 위에서 확인한 정보를 넣으세요:

```
postgresql://postgres:[비밀번호]@db.[프로젝트ID].supabase.co:5432/postgres
```

### 📝 예시:

```
프로젝트 ID: xyzabc123defg
비밀번호: MySecret123!

완성된 CONNECTION STRING:
postgresql://postgres:MySecret123!@db.xyzabc123defg.supabase.co:5432/postgres
```

### ⚠️ 주의사항:

1. **대괄호 `[]` 는 지우세요**
2. **띄어쓰기 없이** 붙여쓰기
3. **특수문자**가 비밀번호에 있어도 그대로 입력

```
내 완성된 CONNECTION STRING:
_________________________________________________________________
```

---

## 🔑 Supabase API 정보도 만들기

### SUPABASE_URL

```
https://[프로젝트ID].supabase.co
```

예시:
```
프로젝트 ID: xyzabc123defg
SUPABASE_URL: https://xyzabc123defg.supabase.co
```

```
내 SUPABASE_URL:
_________________________________________________________________
```

---

### SUPABASE_KEY (anon public key)

이건 찾아야 합니다:

1. ⚙️ **Project Settings** 클릭
2. 왼쪽 메뉴에서 **API** 클릭
3. **Project API keys** 섹션
4. **`anon`** **`public`** 키 찾기
5. 👁️ (눈 모양) 아이콘 클릭하면 보임
6. 📋 복사 버튼 클릭

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS... (매우 긴 문자열)
```

**못 찾겠다면:**
- 페이지를 새로고침 해보세요
- 프로젝트가 완전히 생성될 때까지 2-3분 기다리세요

```
내 SUPABASE_KEY:
_________________________________________________________________
```

---

## ✅ 최종 확인 - 모든 정보 정리

이제 다음 정보가 모두 준비되었습니다:

```
=== 내 JAKUP 배포 정보 ===

1. DATABASE_URL (직접 만든 Connection String):
   postgresql://postgres:[비밀번호]@db.[프로젝트ID].supabase.co:5432/postgres
   
   _________________________________________________________________

2. SUPABASE_URL:
   https://[프로젝트ID].supabase.co
   
   _________________________________________________________________

3. SUPABASE_KEY (복사한 anon public key):
   
   _________________________________________________________________

4. SUPABASE_STORAGE_BUCKET:
   jakup-attachments

5. JWT_SECRET (PowerShell에서 생성):
   -join ((33..126) | Get-Random -Count 32 | % {[char]$_})
   
   _________________________________________________________________
```

---

## 🚀 다음 단계

이제 **SIMPLE_DEPLOYMENT_CHECKLIST.md** 파일을 열고 2단계(Vercel 배포)로 진행하세요!

---

## 🆘 여전히 문제가 있나요?

### 프로젝트 ID를 못 찾겠어요
→ 스크린샷을 찍어서 보내주시면 찾아드릴게요

### API 키가 안 보여요
→ 프로젝트가 아직 생성 중일 수 있습니다 (2-3분 대기)

### 만든 Connection String이 작동하지 않아요
→ 다음을 확인하세요:
- 비밀번호에 오타가 없는지
- 특수문자가 정확히 입력되었는지
- 프로젝트 ID가 정확한지

---

<div align="center">

**이 방법으로 안 되면 알려주세요!**

다른 방법을 찾아드리겠습니다 😊

</div>

