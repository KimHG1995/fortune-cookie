# CI/CD 운영 가이드

이 프로젝트는 **GitHub Actions로 CI**를 수행하고, **Vercel 무료 플랜**으로 배포한다. 별도 백엔드 인스턴스는 사용하지 않는다.

## 1) CI (GitHub Actions)
- 워크플로: `.github/workflows/ci.yml`
- 트리거: `main` 브랜치의 push/PR
- 실행 내용:
  - pnpm 의존성 설치
  - `pnpm lint`
  - `pnpm build`

## 2) CD (Vercel)
### 2.1 기본 배포 방식 (권장)
1. Vercel에서 GitHub 리포지토리를 연결한다.
2. `main` 브랜치 → 프로덕션 배포
3. PR 브랜치 → 프리뷰 배포

### 2.2 환경 변수
Vercel 프로젝트 설정에서 아래 값을 등록한다.
```
GEMINI_API_KEY=your_api_key
```
키가 없으면 서버 액션에서 폴백 운세가 반환된다.

## 3) 확인 체크리스트
- PR 생성 시 CI가 통과하는지 확인한다.
- Vercel 프리뷰 URL로 기능을 확인한다.
- 프로덕션 배포 후 `/admin/test` 페이지가 정상 렌더링되는지 확인한다.
