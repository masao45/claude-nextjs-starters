"use client"

import { useCallback, useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const USERS_URL = "https://jsonplaceholder.typicode.com/users"
const BROKEN_URL = "https://jsonplaceholder.typicode.com/this-endpoint-does-not-exist"

export default function DataFetchingExamplePage() {
  const [status, setStatus] = useState("loading")
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")

  const load = useCallback(async (url) => {
    setStatus("loading")
    setError("")
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`요청 실패: ${res.status} ${res.statusText}`)
      }
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
      setStatus(Array.isArray(data) && data.length === 0 ? "empty" : "success")
    } catch (err) {
      setError(err.message)
      setStatus("error")
    }
  }, [])

  useEffect(() => {
    queueMicrotask(() => load(USERS_URL))
  }, [load])

  return (
    <Card>
      <CardHeader>
        <CardTitle>데이터 페칭 예제</CardTitle>
        <CardDescription>
          JSONPlaceholder 공개 API(<code>/users</code>)를 실제로 호출합니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => load(USERS_URL)}>
            다시 불러오기
          </Button>
          <Button variant="outline" onClick={() => load(BROKEN_URL)}>
            에러 재현
          </Button>
          <Button variant="outline" onClick={() => { setUsers([]); setStatus("empty") }}>
            빈 상태 보기
          </Button>
        </div>

        {status === "loading" && (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        )}

        {status === "error" && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>요청 실패</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {status === "empty" && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            데이터가 없습니다.
          </p>
        )}

        {status === "success" && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>회사</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.company?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
