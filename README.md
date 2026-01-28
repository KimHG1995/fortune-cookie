# 포춘 브레이커

직업을 쪼개고 실행을 정리하는 포춘쿠키 프로젝트입니다. 무료 LLM 기반으로 운세를 생성하며, 키가 없을 때는 로컬 폴백 문장을 사용합니다.

## 실행 방법

```bash
pnpm dev
```

## 환경 변수

`.env.local` 파일을 만들고 아래 값을 설정하세요.

```bash
GEMINI_API_KEY=your_api_key
```

키가 없으면 로컬 폴백 운세가 제공됩니다.

## 주요 페이지

- `/` : 포춘쿠키 메인
- `/about` : 서비스 소개
- `/privacy-policy` : 개인정보 처리방침
- `/contact` : 문의
- `/insight` : 인사이트 페이지
- `/admin/test` : 스모크 테스트

## 구조

```
src/
  app/
  lib/
  models/
```

## 배포

Vercel에 연결한 뒤 환경 변수만 등록하면 됩니다.
