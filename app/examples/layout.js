"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"
import { examplesNavItems } from "@/components/layout/examples-nav-items"

export default function ExamplesLayout({ children }) {
  const pathname = usePathname()

  return (
    <Container className="space-y-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold">예제</h1>
        <p className="text-sm text-muted-foreground">
          바로 참고해서 쓸 수 있는 실전 패턴 모음입니다.
        </p>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-b pb-px">
        <Link
          href="/examples"
          className={cn(
            "shrink-0 border-b-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground",
            pathname === "/examples"
              ? "border-primary text-foreground"
              : "border-transparent"
          )}
        >
          전체
        </Link>
        {examplesNavItems.map(({ title, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "shrink-0 border-b-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground",
              pathname === href
                ? "border-primary text-foreground"
                : "border-transparent"
            )}
          >
            {title}
          </Link>
        ))}
      </nav>

      <div>{children}</div>
    </Container>
  )
}
