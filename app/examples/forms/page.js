"use client"

import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { loginSchema } from "@/lib/validations/login"
import { profileFormSchema } from "@/lib/validations/profile-form"

function LoginFormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500))
    toast.success("예제 제출 완료 (실제 로그인은 /login 페이지를 이용하세요)")
    reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>로그인 폼 패턴</CardTitle>
        <CardDescription>
          react-hook-form + zod 조합입니다. 실제 로그인 페이지는{" "}
          <Link href="/login" className="underline underline-offset-4">
            /login
          </Link>
          에 별도로 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="example-email">이메일</FieldLabel>
              <Input id="example-email" type="email" {...register("email")} />
              <FieldError errors={[errors.email]} />
            </Field>
            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="example-password">비밀번호</FieldLabel>
              <Input id="example-password" type="password" {...register("password")} />
              <FieldError errors={[errors.password]} />
            </Field>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "제출 중..." : "제출"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

function ProfileFormExample() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      bio: "",
      role: "",
      agreeTerms: false,
      receiveNewsletter: true,
    },
  })

  const onSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500))
    toast.success(`${values.name}님의 프로필이 저장되었습니다.`)
    reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>종합 입력 폼</CardTitle>
        <CardDescription>
          Input, Textarea, Select, Checkbox, Switch를 모두 포함한 검증 패턴입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">이름</FieldLabel>
              <Input id="name" {...register("name")} />
              <FieldError errors={[errors.name]} />
            </Field>

            <Field data-invalid={!!errors.bio}>
              <FieldLabel htmlFor="bio">자기소개</FieldLabel>
              <Textarea id="bio" rows={3} {...register("bio")} />
              <FieldError errors={[errors.bio]} />
            </Field>

            <Field data-invalid={!!errors.role}>
              <FieldLabel htmlFor="role">역할</FieldLabel>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="role" className="w-full">
                      <SelectValue placeholder="역할을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="developer">개발자</SelectItem>
                      <SelectItem value="designer">디자이너</SelectItem>
                      <SelectItem value="pm">기획자</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.role]} />
            </Field>

            <Field orientation="horizontal" data-invalid={!!errors.agreeTerms}>
              <Controller
                control={control}
                name="agreeTerms"
                render={({ field }) => (
                  <Checkbox
                    id="agreeTerms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <FieldLabel htmlFor="agreeTerms">이용약관에 동의합니다</FieldLabel>
            </Field>
            <FieldError errors={[errors.agreeTerms]} />

            <Field orientation="horizontal">
              <FieldLabel htmlFor="receiveNewsletter">뉴스레터 수신</FieldLabel>
              <Controller
                control={control}
                name="receiveNewsletter"
                render={({ field }) => (
                  <Switch
                    id="receiveNewsletter"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </Field>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "저장 중..." : "저장"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default function FormsExamplePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <LoginFormExample />
      <ProfileFormExample />
    </div>
  )
}
