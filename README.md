# Buildone

> 개발자를 위한 할 일 목록 관리 서비스
> 개발 기간: 2025.01.23 ~ 2025.03.18 (약 8주)

## 팀 구성 및 역할

- 김강우: 팀장
  - 대시보드 페이지
  - Modal, Sheet, Popup 컴포넌트 개발
  - 할 일 생성/수정 기능 구현
  - 크롬 익스텐션 개발
- 곽태근
  - 모든 할 일 목록, 랜딩 페이지
  - 내비게이션 바, Todo 컴포넌트 개발
  - Sentry, Jest 테스트 환경 구축
- 유하임
  - 노트 모아보기, 노트 작성 페이지
  - Dropdown, TapMenu, Chip, Filter, Counting 컴포넌트 개발
  - 스트릭 보드, 태그 기능 구현
- 채유빈
  - 로그인/회원가입, 목표 상세 페이지
  - Input, Button, Progress Bar 컴포넌트 개발
  - 웹 푸시 알림, 프로필 카드 저장 기능 구현

## 핵심 기능

1.

## 설치 및 실행 방법

```
node version: v22.14.0
npm version: v10.9.2
```

1. 레포지토리를 클론합니다.

```shell
git clone https://github.com/codeit-si/buildone-client.git

cd buildone-client
```

2. `buildone-client` 디렉토리의 최상위에 `.env.local` 파일 생성 후 아래와 같이 작성합니다.

```
NEXT_PUBLIC_SERVER_ADDRESS=http://localhost:3000
```

3. 터미널에서 아래 명령어를 차례대로 입력합니다.

```shell
npm install
npm run dev
```

4. 브라우저에서 http://localhost:3000 페이지에 접속합니다.

## 배포 주소

https://buildone.me

## 기술 스택

- 프레임워크 & 언어: Next.js 14, TypeScript
- 스타일링: Tailwind CSS
- 코드 품질 관리: Husky, ESLint, Prettier
- 데이터 요청 & 상태 관리: TanStack Query, Zustand
- 유효성 검사 & 폼 관리: React Hook Form, Zod
- API 통신: Axios
- 푸시 알림: Firebase
- 테스트 & 모니터링: Sentry, Jest
- 텍스트 편집기: Tiptap
- 배포: AWS Amplify

## 프로젝트 구조

```yaml
.
├── .husky
├── public
├── src
│   ├── app  # 라우팅 관련 파일
│   │   ├── api  # api route handler
│   ├── assets  # svg 파일 (svgr 활용)
│   ├── components
│   │   ├── @common  # 공용 UI 컴포넌트
│   │   ├──  # 각 도메인, 페이지 별 필요한 컴포넌트 정의
│   ├── constants  # 상수
│   ├── hooks  # 커스텀 훅
│   ├── lib  # 외부 라이브러리 관련 파일
│   ├── services  # API 요청 관련 파일
│   │   └── query-key.ts  # tanstack-query 키 관리 파일
│   ├── store  # Zustand store 관리 파일
│   ├── styles
│   ├── types
│   ├── utils
```

## 주요 기능
