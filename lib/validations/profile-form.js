import { z } from "zod"

export const profileFormSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  bio: z.string().max(200, "자기소개는 200자 이내로 입력해주세요.").optional(),
  role: z.enum(["developer", "designer", "pm"], {
    message: "역할을 선택해주세요.",
  }),
  agreeTerms: z.boolean().refine((v) => v === true, {
    message: "약관에 동의해야 합니다.",
  }),
  receiveNewsletter: z.boolean(),
})
