"use client"

import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Container } from "@/components/layout/container"
import { useAuthStore } from "@/store/use-auth-store"

const STATS = [
  { label: "방문자", value: "1,204" },
  { label: "신규 가입", value: "48" },
  { label: "전환율", value: "3.2%" },
]

const ACTIVITY_ROWS = [
  { id: 1, name: "김민준", status: "active", date: "2026-10-25" },
  { id: 2, name: "이서윤", status: "pending", date: "2026-10-24" },
  { id: 3, name: "박지호", status: "active", date: "2026-10-23" },
]

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  const [isLoading, setIsLoading] = useState(true)
  const [activity, setActivity] = useState([])

  useEffect(() => {
    // TODO: 실제 API 연동 시 이 부분을 fetch("/api/dashboard") 호출로 교체
    const timer = setTimeout(() => {
      setActivity(ACTIVITY_ROWS)
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Container className="space-y-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold">
          {user ? `${user.name}님, 환영합니다.` : "대시보드"}
        </h1>
        <p className="text-sm text-muted-foreground">최근 활동과 주요 지표를 확인하세요.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))
          : STATS.map((stat) => (
              <Card key={stat.label}>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>날짜</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activity.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <Badge variant={row.status === "active" ? "default" : "secondary"}>
                        {row.status === "active" ? "활성" : "대기"}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}
