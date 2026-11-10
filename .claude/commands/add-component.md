---
description: 새 React 함수형 컴포넌트 파일을 components/ 폴더에 생성합니다
argument-hint: <ComponentName>
---

`components/` 폴더에 `$1` 컴포넌트를 새로 만들어주세요.

## 절차

1. `$1`이 비어 있으면 컴포넌트 이름을 사용자에게 물어보고 중단합니다.
2. `$1`을 PascalCase로 해석하고, 파일명은 kebab-case로 변환합니다. (예: `UserCard` → `components/user-card.jsx`)
3. 같은 이름의 파일이 이미 있으면 덮어쓰지 말고 사용자에게 알립니다.
4. 아래 템플릿으로 파일을 생성합니다.
5. 생성한 파일 경로와 사용 예시(import 구문)를 알려줍니다.

## 프로젝트 규칙 (CLAUDE.md 기준)

- 이 프로젝트는 JavaScript 전용입니다. `.ts`/`.tsx`는 만들지 말고 `.jsx`를 사용합니다.
- 경로 별칭은 `@/*`(프로젝트 루트)입니다. 예: `@/components/user-card`
- 스타일은 Tailwind CSS 클래스를 사용하고, 클래스 병합은 `@/lib/utils`의 `cn`을 사용합니다.
- 코드 스타일: 스페이스 2칸, 세미콜론 없음, 작은따옴표, 한글 주석, 함수에 간단한 JSDoc

## 템플릿

```jsx
import { cn } from '@/lib/utils'

/**
 * $1 컴포넌트
 * @param {object} props
 * @param {string} [props.className] - 추가 Tailwind 클래스
 * @param {React.ReactNode} [props.children] - 하위 요소
 */
export function $1({ className, children, ...props }) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  )
}
```

템플릿의 `$1`은 실제 PascalCase 컴포넌트 이름으로 치환합니다.
