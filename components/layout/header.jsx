"use client"

import Link from "next/link"
import { LogOut, User as UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Container } from "@/components/layout/container"
import { navItems } from "@/components/layout/nav-items"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuthStore } from "@/store/use-auth-store"

export function Header() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <header className="border-b bg-background">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold">
          Next Starter
        </Link>

        <nav className="hidden items-center gap-4 sm:flex">
          {navItems.map(({ title, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <Icon className="size-4" />
              {title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                <Avatar className="size-8">
                  <AvatarFallback>
                    {user.name?.[0]?.toUpperCase() ?? <UserIcon className="size-4" />}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2" /> 로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button nativeButton={false} render={<Link href="/login" />}>
              로그인
            </Button>
          )}
        </div>
      </Container>
    </header>
  )
}
