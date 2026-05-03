# 가계쀼 Boo-jet

<p align="center">
  <img src="./src/assets/Logo.png" alt="가계쀼 로고" width="120" />
</p>

<h3 align="center">부부와 개인이 함께 쓰는 KB 스타일 가계부 웹 애플리케이션</h3>

<p align="center">
  <a href="https://kbteampj-deploy-practice.vercel.app/auth/login">
    <strong>배포된 프로젝트 체험하기</strong>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Pinia-3.0-F7D336?style=flat-square&logo=vue.js&logoColor=111" alt="Pinia" />
  <img src="https://img.shields.io/badge/json--server-API-555?style=flat-square" alt="json-server" />
  <img src="https://img.shields.io/badge/Vercel-Frontend-000?style=flat-square&logo=vercel" alt="Vercel" />
  <img src="https://img.shields.io/badge/Render-Backend-46E3B7?style=flat-square&logo=render&logoColor=111" alt="Render" />
</p>

<p align="center">
  <a href="#소개">소개</a> ·
  <a href="#팀원-소개">팀원 소개</a> ·
  <a href="#주요-기능">주요 기능</a> ·
  <a href="#기술-스택">기술 스택</a> ·
  <a href="#실행-방법">실행 방법</a> ·
  <a href="#배포-구조">배포 구조</a>
</p>

<br />

<p align="center">
  <img src="./src/assets/happy_sunglass_Character.png" alt="가계쀼 캐릭터" width="260" />
</p>

## 소개

**가계쀼**는 개인 가계부와 부부 공동 가계부를 함께 관리할 수 있는 웹 앱입니다.  
로그인, 회원가입, 거래 내역 관리, 카테고리별 지출 확인, 커플 연결, 공동 목표 관리까지 하나의 흐름으로 사용할 수 있도록 구성했습니다.

> Figma 기반 UI를 Vue 애플리케이션으로 구현하고, `json-server`를 활용해 API 흐름을 시연할 수 있도록 만든 팀 프로젝트입니다.

## Team Members & Roles

| 이름 | GitHub | 담당 역할 | 주요 작업 |
| --- | --- | --- | --- |
| we5046 | [@we5046](https://github.com/we5046) | 배포 및 프론트엔드 개발 | Vercel/Render 배포 환경 구성, API 연동 설정, 화면 기능 구현 |
| heokyeongmin390 | [@heokyeongmin390](https://github.com/heokyeongmin390) | 프론트엔드 개발 | 사용자 플로우 구현, 페이지 UI 개선, 기능 연결 |
| 7aeHoon | [@7aeHoon](https://github.com/7aeHoon) | UI 개발 | 공통 UI 컴포넌트 구현, 페이지 완성도 개선 |
| 한승연 | GitHub 주소 입력 | 프론트엔드 개발 | 담당 기능 입력 |
| hoon | GitHub 주소 입력 | 프론트엔드 개발 | 담당 기능 입력 |

> 각 팀원의 GitHub 주소와 담당 기능은 실제 역할에 맞게 수정하면 됩니다.

## 주요 기능

- **회원 관리**: 회원가입, 로그인, 세션 유지, 마이페이지 정보 수정
- **개인 가계부**: 수입/지출 등록, 수정, 삭제 및 거래 내역 조회
- **카테고리 분석**: 카테고리별 지출 비중과 월별 흐름 확인
- **커플 연결**: 사용자 검색, 커플 요청, 수락/취소/해제
- **부부 가계부**: 두 사용자의 거래 데이터를 함께 비교하고 관리
- **공동 목표**: 커플 목표 생성, 진행률 확인, 목표별 거래 연결
- **반응형 UI**: 데스크톱과 모바일 환경을 고려한 레이아웃

## 기술 스택

| 영역 | 사용 기술 |
| --- | --- |
| Frontend | Vue 3, Vite, Vue Router |
| State | Pinia |
| UI | Bootstrap, Font Awesome, Lucide Vue |
| Chart | Chart.js, vue-chartjs |
| API | Axios |
| Mock Backend | json-server |
| Deploy | Vercel, Render |

## 프로젝트 구조

```txt
TeamProject/
  src/
    api/          # axios 인스턴스와 API 요청 함수
    assets/       # 로고, 캐릭터, 프로필 이미지, 공통 스타일
    components/   # 화면 단위 UI 컴포넌트
    layouts/      # 인증/기본 레이아웃
    pages/        # 라우트 페이지
    router/       # Vue Router 설정
    service/      # 사용자 탈퇴 등 도메인 서비스
    stores/       # Pinia 상태 관리
  db.json         # json-server mock database
  vercel.json     # Vercel SPA rewrite 설정
```

## 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env` 파일을 만들고 API 주소를 설정합니다.

```env
VITE_API_BASE_URL=http://localhost:3001
```

### 3. Mock API 서버 실행

```bash
npm run server
```

### 4. 개발 서버 실행

```bash
npm run dev
```

## 사용 가능한 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | Vite 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run server` | `db.json` 기반 json-server 실행 |
| `npm run server-local` | `db.local.json` 기반 json-server 실행 |
| `npm start` | Render 배포용 json-server 실행 |

## 배포 구조

이 프로젝트는 프론트엔드와 Mock API 서버를 분리해서 배포합니다.

```txt
Vercel
  Vue/Vite Frontend
  https://kbteampj-deploy-practice.vercel.app/auth/login

Render
  json-server Backend
  db.json
```

### Vercel 설정

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Root Directory: TeamProject
```

환경변수:

```env
VITE_API_BASE_URL=https://kb-budget-api.onrender.com
```

### Render 설정

```txt
Runtime: Node
Build Command: npm install
Start Command: npm start
Root Directory: TeamProject
```

## 참고

`json-server`는 시연용 mock backend입니다. Render 무료 인스턴스에서는 일정 시간 요청이 없으면 서버가 잠들 수 있고, 재시작 시 런타임 중 변경된 데이터가 유지되지 않을 수 있습니다. 실제 서비스로 확장한다면 Supabase, Firebase, PostgreSQL 같은 영속 DB로 이전하는 것을 권장합니다.
