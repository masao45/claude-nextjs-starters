"use client"

import { useState } from "react"
import { Bell, Download, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Section({ title, description, children }) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
  )
}

export default function ComponentsShowcasePage() {
  const [switchChecked, setSwitchChecked] = useState(false)

  return (
    <div className="space-y-10">
      <Section
        title="Button"
        description="variant(default/outline/secondary/ghost/destructive/link) x size(default/sm/lg/icon)"
      >
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">
          <Download />
        </Button>
      </Section>

      <Separator />

      <Section title="Badge" description="variant: default/secondary/destructive/outline">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </Section>

      <Separator />

      <Section title="Alert" description="정보/경고/에러 메시지에 사용">
        <div className="w-full space-y-3">
          <Alert>
            <Bell />
            <AlertTitle>안내</AlertTitle>
            <AlertDescription>기본 Alert입니다.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <Bell />
            <AlertTitle>오류</AlertTitle>
            <AlertDescription>destructive variant Alert입니다.</AlertDescription>
          </Alert>
        </div>
      </Section>

      <Separator />

      <Section title="Avatar">
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Section>

      <Separator />

      <Section title="Skeleton" description="로딩 상태 placeholder">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="size-10 rounded-full" />
      </Section>

      <Separator />

      <Section title="Card">
        <Card className="w-72">
          <CardHeader>
            <CardTitle>카드 제목</CardTitle>
            <CardDescription>카드 설명 텍스트입니다.</CardDescription>
          </CardHeader>
          <CardContent>카드 콘텐츠 영역입니다.</CardContent>
        </Card>
      </Section>

      <Separator />

      <Section title="Switch">
        <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
        <span className="text-sm text-muted-foreground">
          {switchChecked ? "ON" : "OFF"}
        </span>
      </Section>

      <Separator />

      <Section title="Tabs">
        <Tabs defaultValue="a" className="w-full">
          <TabsList>
            <TabsTrigger value="a">탭 A</TabsTrigger>
            <TabsTrigger value="b">탭 B</TabsTrigger>
          </TabsList>
          <TabsContent value="a">탭 A 콘텐츠</TabsContent>
          <TabsContent value="b">탭 B 콘텐츠</TabsContent>
        </Tabs>
      </Section>

      <Separator />

      <Section title="Table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>역할</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>홍길동</TableCell>
              <TableCell>관리자</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>

      <Separator />

      <Section title="Dialog">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>다이얼로그 열기</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>제목</DialogTitle>
              <DialogDescription>다이얼로그 설명입니다.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>닫기</DialogClose>
              <Button variant="destructive">
                <Trash2 className="mr-2" />
                삭제
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Separator />

      <Section title="DropdownMenu">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>메뉴 열기</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>항목 1</DropdownMenuItem>
            <DropdownMenuItem>항목 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>
    </div>
  )
}
