import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export default function Home() {
  return (
    <Container className="flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center gap-6 text-center">
      <h1 className="max-w-xl text-4xl font-semibold tracking-tight">
        Next.js 보일러플레이트
      </h1>
      <p className="max-w-md text-muted-foreground">
        Tailwind CSS, shadcn UI, 상태관리, 폼 검증, 다크모드, 실전 예제가 준비된 스타터킷입니다.
      </p>
      <div className="flex gap-3">
        <Button nativeButton={false} render={<Link href="/examples" />}>
          예제 보러가기
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/login" />}
        >
          로그인
        </Button>
      </div>
    </Container>
  )
}
