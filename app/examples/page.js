import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { examplesNavItems } from "@/components/layout/examples-nav-items"

const DESCRIPTIONS = {
  "/examples/components": "shadcn 컴포넌트의 variant와 size를 한눈에 모아 본 쇼케이스입니다.",
  "/examples/forms": "react-hook-form + zod로 만든 로그인/종합 입력 폼 예제입니다.",
  "/examples/layout": "Header, Footer, Container와 반응형 그리드 레이아웃 패턴입니다.",
  "/examples/hooks": "usehooks-ts로 구현하는 자주 쓰는 커스텀 훅 데모입니다.",
  "/examples/data-fetching": "실제 공개 API를 호출해 로딩/에러/빈 상태를 다루는 예제입니다.",
  "/examples/optimization": "성능 최적화, SEO, PWA 설정을 다루는 예제입니다.",
}

export default function ExamplesPage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {examplesNavItems.map(({ title, href }) => (
        <Link key={href} href={href}>
          <Card className="h-full transition-colors hover:border-foreground/30">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {title}
                <ArrowRight className="size-4 text-muted-foreground" />
              </CardTitle>
              <CardDescription>{DESCRIPTIONS[href]}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
