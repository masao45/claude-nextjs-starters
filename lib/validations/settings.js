import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  email: z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 형식이 아닙니다."),
})
