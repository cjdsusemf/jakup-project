# ✅ 배포 체크리스트

프로젝트를 Railway.app에 배포하기 전에 확인해야 할 사항들입니다.

---

## 🔐 보안 (필수)

- [ ] **`.gitignore` 확인**: `.env` 파일이 포함되어 있는지 확인
- [ ] **JWT_SECRET 생성**: 새로운 랜덤 키 생성 (64자)
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] **ENCRYPTION_KEY 생성**: 새로운 암호화 키 생성 (44자)
  ```bash
  node -e "console.log(Buffer.from(require('crypto').randomBytes(32)).toString('base64'))"
  ```
- [ ] **로컬 `.env` 파일 삭제 또는 보안**: Git에 커밋되지 않도록 확인
- [ ] **민감한 정보 제거**: 코드에 하드코딩된 비밀번호, API 키 등 제거

---

## 📂 GitHub 준비

- [ ] **GitHub 저장소 생성**: Private 저장소 권장
- [ ] **`.gitignore` 설정 완료**: 불필요한 파일 제외
- [ ] **모든 변경사항 커밋**:
  ```bash
  git add .
  git commit -m "Prepare for deployment"
  ```
- [ ] **GitHub에 푸시**:
  ```bash
  git push origin main
  ```
- [ ] **README.md 업데이트**: 프로젝트 설명 추가

---

## 🚂 Railway 계정

- [ ] **Railway 계정 생성**: https://railway.app
- [ ] **GitHub 연동**: Railway에 GitHub 계정 연결
- [ ] **신용카드 등록**: 월 $5 무료 크레딧 받기
- [ ] **예산 알림 설정**: $5, $10 단계별 알림

---

## 🗄️ 데이터베이스

- [ ] **PostgreSQL 서비스 생성**: Railway에서 추가
- [ ] **DATABASE_URL 연결**: 백엔드 환경 변수에 Reference로 연결
- [ ] **데이터베이스 마이그레이션 확인**: Sequelize sync 설정 확인
- [ ] **백업 계획 수립**: 정기 백업 스크립트 설정 (선택)

---

## 🖥️ 백엔드 설정

- [ ] **Root Directory 설정**: `server`
- [ ] **Dockerfile 확인**: `server/Dockerfile` 존재 확인
- [ ] **환경 변수 설정**:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=3001`
  - [ ] `DATABASE_URL` (Reference)
  - [ ] `JWT_SECRET` (생성한 키)
  - [ ] `ENCRYPTION_KEY` (생성한 키)
  - [ ] `CLIENT_URL` (프론트엔드 URL, 나중에 추가)
- [ ] **도메인 생성**: Railway에서 백엔드 도메인 생성
- [ ] **헬스체크 확인**: `/health` 엔드포인트 테스트
  ```
  https://your-backend-url.up.railway.app/health
  ```

---

## 🎨 프론트엔드 설정

- [ ] **Root Directory 설정**: `client`
- [ ] **Dockerfile 확인**: `client/Dockerfile` 존재 확인
- [ ] **환경 변수 설정**:
  - [ ] `REACT_APP_API_URL` (백엔드 URL + `/api`)
    - 예시: `https://backend-xxx.up.railway.app/api`
- [ ] **도메인 생성**: Railway에서 프론트엔드 도메인 생성
- [ ] **프론트엔드 접속 확인**:
  ```
  https://your-frontend-url.up.railway.app
  ```

---

## 🔗 CORS 설정

- [ ] **백엔드 CLIENT_URL 업데이트**: 프론트엔드 URL로 설정
- [ ] **CORS 에러 없는지 확인**: 브라우저 콘솔 확인

---

## 🧪 기능 테스트

### 백엔드 API
- [ ] **헬스체크**: `/health` 응답 확인
- [ ] **회원가입 API**: 새 계정 생성 테스트
- [ ] **로그인 API**: JWT 토큰 발급 확인
- [ ] **인증 API**: 토큰으로 보호된 엔드포인트 접근

### 프론트엔드
- [ ] **로그인 페이지**: 정상 표시
- [ ] **회원가입**: 새 계정 생성
- [ ] **로그인**: 생성한 계정으로 로그인
- [ ] **대시보드**: 정상 표시
- [ ] **작업 생성**: 새 작업 추가
- [ ] **작업 조회**: 작업 목록 확인
- [ ] **파일 업로드**: 첨부파일 업로드 (Volume 설정 필요)

### 통합 테스트
- [ ] **전체 워크플로우**: 회원가입 → 로그인 → 작업 생성 → 조회
- [ ] **권한 확인**: 관리자, 작업반장, 일반 사용자 권한 테스트
- [ ] **모바일 반응형**: 모바일 기기에서 접속 확인

---

## 📊 모니터링

- [ ] **Railway Usage 확인**: 사용량 모니터링
- [ ] **로그 확인**: 백엔드/프론트엔드 로그 정상 출력
- [ ] **에러 알림 설정**: Railway Discord 또는 이메일 알림
- [ ] **업타임 모니터링**: UptimeRobot 등 외부 모니터링 (선택)

---

## 💰 비용 관리

- [ ] **무료 크레딧 확인**: $5 크레딧 활성화
- [ ] **예상 비용 계산**: 10-30명 사용자 = $3-5/월
- [ ] **예산 한도 설정**: Railway에서 예산 알림 설정
- [ ] **비용 최적화**:
  - [ ] 불필요한 로그 제거
  - [ ] 이미지 크기 최적화
  - [ ] 개발/테스트는 로컬에서

---

## 📚 문서화

- [ ] **배포 URL 기록**: 백엔드/프론트엔드 URL 저장
- [ ] **환경 변수 백업**: 안전한 곳에 보관 (1Password, Bitwarden 등)
- [ ] **팀원 공유**: 배포 URL과 사용 방법 공유
- [ ] **업데이트 방법 문서화**: Git push로 자동 배포 안내

---

## 🔄 CI/CD (자동 배포)

- [ ] **자동 배포 확인**: GitHub push 시 자동 배포 작동
- [ ] **배포 알림**: Railway Discord/Slack 알림 설정 (선택)
- [ ] **롤백 계획**: 이전 배포로 롤백하는 방법 숙지

---

## 🚨 백업 및 복구

- [ ] **데이터베이스 백업**: 정기 백업 스크립트 실행
- [ ] **백업 저장**: 클라우드 스토리지에 백업 (AWS S3, Google Drive 등)
- [ ] **복구 테스트**: 백업으로 복구하는 절차 테스트
- [ ] **재해 복구 계획**: 장애 발생 시 대응 계획 수립

---

## 🎯 성능 최적화 (선택)

- [ ] **CDN 설정**: Cloudflare 등 CDN 추가
- [ ] **이미지 최적화**: 업로드 파일 크기 제한
- [ ] **캐싱 전략**: Redis 추가 (사용자 증가 시)
- [ ] **데이터베이스 인덱스**: 쿼리 성능 최적화

---

## 🔒 추가 보안 (권장)

- [ ] **HTTPS 강제**: Railway는 자동으로 HTTPS 제공
- [ ] **Rate Limiting**: API 요청 제한 설정
- [ ] **SQL Injection 방지**: Sequelize 사용으로 기본 방어
- [ ] **XSS 방지**: 입력 값 검증 및 이스케이프
- [ ] **CSRF 방지**: CSRF 토큰 구현 (선택)

---

## 📱 도메인 연결 (선택)

자신만의 도메인을 사용하려면:

- [ ] **도메인 구매**: Namecheap, GoDaddy, Cloudflare 등
- [ ] **DNS 설정**: CNAME 레코드 추가
- [ ] **프론트엔드 도메인**: `app.yourdomain.com`
- [ ] **백엔드 도메인**: `api.yourdomain.com`
- [ ] **환경 변수 업데이트**: 커스텀 도메인으로 변경

---

## 🎉 배포 완료!

모든 체크리스트를 완료하면:

✅ **안전한 프로덕션 환경**  
✅ **자동 배포 파이프라인**  
✅ **모니터링 및 알림**  
✅ **비용 효율적인 운영**  
✅ **확장 가능한 인프라**

---

## 📞 문제가 발생하면

1. **Railway 로그 확인**: Deployments → View Logs
2. **환경 변수 재확인**: Variables 탭에서 모든 변수 점검
3. **GitHub 이슈 생성**: 프로젝트 저장소에 이슈 등록
4. **Railway Discord**: https://discord.gg/railway
5. **공식 문서**: https://docs.railway.app

---

**이 체크리스트를 인쇄하거나 저장해두고 배포 시마다 참고하세요!**

마지막 업데이트: 2025-11-19

