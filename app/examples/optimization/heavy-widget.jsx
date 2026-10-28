"use client"

import { Badge } from "@/components/ui/badge"

export default function HeavyWidget() {
  return (
    <div className="rounded-lg border p-4 text-sm">
      <p className="mb-2">무거운 위젯이 로드되었습니다. (실제로는 차트 라이브러리 등을 가정)</p>
      <Badge>동적 로딩됨</Badge>
    </div>
  )
}
