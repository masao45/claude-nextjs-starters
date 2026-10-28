import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function CodeNote({ children }) {
  return (
    <code className="block rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
      {children}
    </code>
  )
}

export default function LayoutExamplePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Header / Footer / Container</h2>
          <p className="text-sm text-muted-foreground">
            이 사이트의 모든 페이지는 <code>app/layout.js</code>에서 Header와 Footer로
            감싸지고, 각 페이지 내부에서 <code>components/layout/container.jsx</code>의{" "}
            <code>Container</code>로 콘텐츠 폭을 제한합니다.
          </p>
        </div>
        <CodeNote>{`<Container className="space-y-6 py-8">...</Container>`}</CodeNote>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">반응형 그리드</h2>
          <p className="text-sm text-muted-foreground">
            모바일 1열 → 태블릿 2열 → 데스크톱 3열로 늘어나는 카드 그리드 패턴입니다.
          </p>
        </div>
        <CodeNote>{`grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}</CodeNote>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["A", "B", "C"].map((label) => (
            <Card key={label}>
              <CardHeader>
                <CardTitle>카드 {label}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                리사이즈해서 그리드 열 수 변화를 확인해보세요.
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">사이드바 없는 2단 레이아웃</h2>
          <p className="text-sm text-muted-foreground">
            본문 + 보조 패널 구조가 필요할 때 쓰는 flex 패턴입니다.
          </p>
        </div>
        <CodeNote>{`flex flex-col gap-4 lg:flex-row`}</CodeNote>
        <div className="flex flex-col gap-4 lg:flex-row">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>본문 영역</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              flex-1로 남은 공간을 모두 차지합니다.
            </CardContent>
          </Card>
          <Card className="lg:w-72">
            <CardHeader>
              <CardTitle>보조 패널</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              고정 너비(lg:w-72)를 갖습니다.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
