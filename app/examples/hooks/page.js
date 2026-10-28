"use client"

import { useState } from "react"
import {
  useLocalStorage,
  useDebounceValue,
  useToggle,
  useCopyToClipboard,
  useMediaQuery,
} from "usehooks-ts"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

function HookCard({ title, description, children }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  )
}

function LocalStorageDemo() {
  const [value, setValue] = useLocalStorage("examples-hooks-note", "", {
    initializeWithValue: false,
  })

  return (
    <HookCard
      title="useLocalStorage"
      description="입력값이 localStorage에 저장됩니다. 새로고침해도 유지됩니다."
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="메모를 입력해보세요"
      />
      <p className="text-xs text-muted-foreground">저장된 값: {value || "(비어있음)"}</p>
    </HookCard>
  )
}

function DebounceDemo() {
  const [text, setText] = useState("")
  const [debouncedText] = useDebounceValue(text, 500)

  return (
    <HookCard
      title="useDebounceValue"
      description="입력을 멈춘 뒤 500ms 후에 반영되는 디바운스 값입니다."
    >
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="검색어 입력"
      />
      <p className="text-xs text-muted-foreground">디바운스된 값: {debouncedText || "(비어있음)"}</p>
    </HookCard>
  )
}

function ToggleDemo() {
  const [value, toggle] = useToggle(false)

  return (
    <HookCard title="useToggle" description="boolean 상태를 토글하는 가장 단순한 훅입니다.">
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={toggle}>
          토글
        </Button>
        <Badge variant={value ? "default" : "secondary"}>{value ? "ON" : "OFF"}</Badge>
      </div>
    </HookCard>
  )
}

function CopyDemo() {
  const [copiedText, copy] = useCopyToClipboard()

  return (
    <HookCard title="useCopyToClipboard" description="클립보드 복사와 복사 상태 확인입니다.">
      <Button
        variant="outline"
        onClick={async () => {
          const ok = await copy("npx create-next-app@latest")
          if (ok) toast.success("클립보드에 복사되었습니다.")
        }}
      >
        명령어 복사
      </Button>
      {copiedText && (
        <p className="text-xs text-muted-foreground">마지막으로 복사된 값: {copiedText}</p>
      )}
    </HookCard>
  )
}

function MediaQueryDemo() {
  const isMobile = useMediaQuery("(max-width: 639px)")

  return (
    <HookCard title="useMediaQuery" description="현재 뷰포트가 모바일 폭인지 실시간으로 감지합니다.">
      <Badge variant={isMobile ? "default" : "secondary"}>
        {isMobile ? "모바일 뷰포트" : "데스크톱/태블릿 뷰포트"}
      </Badge>
    </HookCard>
  )
}

export default function HooksExamplePage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <LocalStorageDemo />
      <DebounceDemo />
      <ToggleDemo />
      <CopyDemo />
      <MediaQueryDemo />
    </div>
  )
}
