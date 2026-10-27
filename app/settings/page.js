"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Container } from "@/components/layout/container"
import { profileSchema } from "@/lib/validations/settings"
import { useSettingsStore } from "@/store/use-settings-store"

export default function SettingsPage() {
  const profile = useSettingsStore((state) => state.profile)
  const notifications = useSettingsStore((state) => state.notifications)
  const setProfile = useSettingsStore((state) => state.setProfile)
  const setNotification = useSettingsStore((state) => state.setNotification)
  const reset = useSettingsStore((state) => state.reset)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: profile,
  })

  const onSubmit = async (values) => {
    // TODO: 실제 API 연동 시 이 부분을 fetch("/api/settings") 호출로 교체
    setProfile(values)
    toast.success("프로필이 저장되었습니다.")
  }

  return (
    <Container className="max-w-2xl space-y-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold">설정</h1>
        <p className="text-sm text-muted-foreground">프로필과 알림 환경을 관리하세요.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">프로필</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>프로필</CardTitle>
              <CardDescription>폼 라이브러리(react-hook-form + zod)로 검증되는 예제입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FieldGroup>
                  <Field data-invalid={!!errors.name}>
                    <FieldLabel htmlFor="name">이름</FieldLabel>
                    <Input id="name" aria-invalid={!!errors.name} {...register("name")} />
                    <FieldError errors={[errors.name]} />
                  </Field>

                  <Field data-invalid={!!errors.email}>
                    <FieldLabel htmlFor="email">이메일</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                    <FieldError errors={[errors.email]} />
                  </Field>

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "저장 중..." : "저장"}
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>알림</CardTitle>
              <CardDescription>
                폼 라이브러리 없이 상태관리(zustand)에 직접 바인딩되는 예제입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field orientation="horizontal">
                  <FieldLabel htmlFor="email-updates">이메일 업데이트 받기</FieldLabel>
                  <Switch
                    id="email-updates"
                    checked={notifications.emailUpdates}
                    onCheckedChange={(checked) => setNotification("emailUpdates", checked)}
                  />
                </Field>

                <Field orientation="horizontal">
                  <FieldLabel htmlFor="push-alerts">푸시 알림 받기</FieldLabel>
                  <Switch
                    id="push-alerts"
                    checked={notifications.pushAlerts}
                    onCheckedChange={(checked) => setNotification("pushAlerts", checked)}
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>설정 초기화</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>설정을 초기화할까요?</DialogTitle>
            <DialogDescription>
              프로필과 알림 설정이 모두 기본값으로 되돌아갑니다. 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>취소</DialogClose>
            <DialogClose
              render={<Button variant="destructive" />}
              onClick={() => {
                reset()
                toast.success("설정이 초기화되었습니다.")
              }}
            >
              초기화
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  )
}
