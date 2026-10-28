# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code(claude.ai/code)에게 제공되는 가이드입니다.

## 명령어

```bash
npm run dev     # 개발 서버 실행 (Turbopack), localhost:3000
npm run build   # 프로덕션 빌드 (설정 파일에 대한 TypeScript 체크도 함께 수행)
npm run start   # 프로덕션 빌드 서빙
npm run lint    # ESLint (eslint-config-next core-web-vitals)
```

테스트 스크립트는 설정되어 있지 않습니다. `typescript`는 `eslint-config-next`가 내부적으로 `typescript-eslint`를 위해 필요로 하기 때문에만 devDependency로 존재합니다 — 이 프로젝트에는 그 외 TypeScript 파일이 없습니다.

## 아키텍처

**JavaScript 전용 Next.js App Router 프로젝트입니다.** `components.json`에 `"tsx": false`로 설정되어 있고 `tsconfig.json`이 아닌 `jsconfig.json`을 사용합니다. 모든 파일은 `.js`/`.jsx`여야 하며 — `.ts`/`.tsx`는 절대 도입하지 마세요. 경로 별칭 `@/*`는 프로젝트 루트를 가리킵니다.

### UI 스택: Radix가 아닌 Base UI 기반 shadcn "base-nova"

`components.json`은 `base-nova` 스타일을 사용하는데, 이는 고전적인 Radix 기반 shadcn이 아니라 `@base-ui/react` 위에 구축된 것입니다. 이로 인해 일반적으로 기대하는 것과 다른 몇 가지 관례가 생깁니다.

- **`asChild` prop이 없습니다.** 대신 `render` prop으로 컴포지션을 처리합니다: `<Button nativeButton={false} render={<Link href="/login" />}>로그인</Button>`. `Button`이 네이티브 `<button>`이 아닌 다른 것(예: `Link`를 감싸는 경우)으로 렌더링될 때는 `nativeButton={false}`를 넘겨야 합니다. 그렇지 않으면 Base UI가 콘솔에 에러를 출력합니다.
- **고전적인 `Form`/`FormField` 래퍼가 없습니다.** 이 레지스트리는 대신 `Field` 프리미티브(`components/ui/field.jsx`: `Field`, `FieldGroup`, `FieldLabel`, `FieldError` 등)를 제공하며, react-hook-form의 `register`/`control`과 직접 함께 사용합니다 — 패턴은 `app/login/page.js`나 `app/examples/forms/page.js`를 참고하세요.
- 네이티브 HTML 요소가 아닌 컨트롤드 입력(`Select`, `Checkbox`, `Switch`)은 `checked`/`onCheckedChange` 또는 `value`/`onValueChange`를 사용하며, react-hook-form의 `register`가 아니라 `Controller`로 연결해야 합니다. `useForm({ defaultValues })`에서 이런 필드에는 항상 `undefined`가 아닌 기본값을 줘야 합니다 — Base UI의 `Select`는 첫 렌더링 이후 비제어(`undefined`)에서 제어 상태로 전환되면 콘솔 에러를 던집니다.
- Tailwind v4는 CSS(`app/globals.css`)로 설정되어 있으며 `tailwind.config.js` 파일은 존재하지 않습니다.

### 레이아웃 구성

`app/layout.js`는 전체를 `ThemeProvider`(next-themes, class 전략) → `Header` → `<main>` → `Footer` → `Toaster`(sonner) → `ServiceWorkerRegister` 순으로 감쌉니다. 모든 페이지는 콘텐츠를 `components/layout/container.jsx`의 `Container`로 감싸 일관된 최대 너비/패딩을 유지합니다 — 그 외의 페이지별 레이아웃 요소는 없습니다.

메인 네비게이션 항목은 `components/layout/nav-items.jsx`에 있습니다(현재 홈/예제/설정). `/examples` 섹션은 `components/layout/examples-nav-items.jsx`에 정의되고 `app/examples/layout.js`에서 렌더링되는 자체 서브 네비게이션을 가집니다.

### 상태관리와 검증

- 전역 상태: `persist` 미들웨어(localStorage)를 사용하는 zustand — `store/use-auth-store.js`(목업 인증, 실제 백엔드 없음), `store/use-settings-store.js`.
- 폼: react-hook-form + zod, 스키마는 `lib/validations/` 아래에 있습니다. 폼 하나당 스키마 파일 하나(`login.js`, `signup.js`, `settings.js`, `profile-form.js`).

### `/examples`는 살아있는 레퍼런스 섹션입니다

`app/examples/`에는 실제로 동작하는 레퍼런스 구현(컴포넌트 쇼케이스, 폼, 레이아웃 패턴, usehooks-ts 훅, 공개 JSONPlaceholder API를 사용하는 데이터 페칭, 성능/SEO/PWA 페이지)이 들어있으며, 앱 전반에서 쓰이는 패턴의 문서 역할도 겸합니다. 스타터킷에 재사용 가능한 새 패턴을 추가할 때는 기능만 구현하지 말고 이곳에도 대응하는 예제를 추가하세요.

### PWA

`app/manifest.js`(Next.js 네이티브 manifest 컨벤션, `/manifest.webmanifest`로 자동 서빙), `public/sw.js`(최소한의 캐싱 + 오프라인 폴백 서비스워커), `components/sw-register.jsx`(클라이언트에서 등록하며 `app/layout.js`에 마운트됨). 이미지 생성 도구가 필요 없도록 아이콘은 SVG(`public/icon.svg`)로 되어 있습니다.

### React Compiler 활성화됨

`next.config.mjs`에서 `reactCompiler: true`로 설정되어 있어 `react-hooks/set-state-in-effect` 린트 규칙이 적용됩니다. `useEffect` 본문에서 `setState`를 동기적으로 호출하면(비동기 함수를 호출했는데 그 함수의 첫 구문들이 `await` 이전에 `setState`를 호출하는 간접적인 경우 포함) 린트가 실패합니다. 이 패턴을 피할 수 없다면 effect 내부에서 `queueMicrotask(() => ...)`로 지연시키세요 (`app/examples/data-fetching/page.js` 참고).

## 언어 및 커뮤니케이션 규칙

- 기본 응답 언어: 한국어
- 코드 주석: 한국어로 작성
- 커밋 메시지: 한국어로 작성
- 문서화: 한국어로 작성
- 변수명/함수명: 영어 (코드 표준 준수)
- 코드 변경 시 변경 이유를 간단히 설명
- 에러 발생 시 원인과 해결 방법을 함께 제시

## 추가 지침
- git 워크플로우 @.claude/rules/git-rules.md
- 코딩 가이드 @.claude/rules/code-style.md
