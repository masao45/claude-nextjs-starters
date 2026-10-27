"use client"

import { useEffect, useRef } from "react"

import { Container } from "@/components/layout/container"

export function Footer() {
  const yearRef = useRef(null)

  useEffect(() => {
    if (yearRef.current) {
      yearRef.current.textContent = String(new Date().getFullYear())
    }
  }, [])

  return (
    <footer className="border-t">
      <Container className="flex h-12 items-center justify-between text-sm text-muted-foreground">
        <span>
          © <span ref={yearRef} suppressHydrationWarning /> Next Starter
        </span>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground"
        >
          GitHub
        </a>
      </Container>
    </footer>
  )
}
