"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const HeavyWidget = dynamic(() => import("./heavy-widget"), {
  loading: () => <p className="text-sm text-muted-foreground">위젯 로딩 중...</p>,
  ssr: false,
})

function CodeBlock({ children }) {
  return (
    <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs text-muted-foreground">
      <code>{children}</code>
    </pre>
  )
}

export default function OptimizationExamplePage() {
  const [showWidget, setShowWidget] = useState(false)

  return (
    <div className="space-y-10">
      <Card>
        <CardHeader>
          <CardTitle>성능 최적화 — next/dynamic 지연 로딩</CardTitle>
          <CardDescription>
            버튼을 누르기 전까지 위젯 코드를 번들에서 분리해 불러오지 않습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock>{`const HeavyWidget = dynamic(() => import("./heavy-widget"), {
  loading: () => <Spinner />,
  ssr: false,
})`}</CodeBlock>
          <Button variant="outline" onClick={() => setShowWidget(true)}>
            위젯 불러오기
          </Button>
          {showWidget && <HeavyWidget />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO 설정 — metadata API</CardTitle>
          <CardDescription>
            App Router는 페이지별 <code>export const metadata</code>(정적) 또는{" "}
            <code>generateMetadata()</code>(동적)로 title/description/OG 태그를 설정합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock>{`export const metadata = {
  title: "페이지 제목",
  description: "검색 결과에 노출될 설명",
  openGraph: { title: "...", images: ["/og.png"] },
}

// 동적인 경우
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return { title: post.title }
}`}</CodeBlock>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>PWA 구현</CardTitle>
          <CardDescription>
            이 프로젝트는 이미 설치 가능한 기본 PWA가 구성되어 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ul className="list-inside list-disc space-y-1">
            <li>
              <code>app/manifest.js</code> — name, 아이콘, theme_color 등 설치 메타데이터
              (브라우저가 자동으로 <code>/manifest.webmanifest</code>에 연결합니다)
            </li>
            <li>
              <code>public/sw.js</code> — 정적 자산을 캐싱하고 오프라인 시 폴백하는 최소
              서비스워커
            </li>
            <li>
              <code>components/sw-register.jsx</code> — 클라이언트에서 서비스워커를
              등록하는 컴포넌트, 루트 레이아웃에 포함되어 있습니다
            </li>
          </ul>
          <p>
            설치 여부는 개발자도구 → Application 탭에서 Manifest/Service Workers 항목으로
            확인할 수 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
