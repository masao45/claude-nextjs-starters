import { cn } from '@/lib/utils'

/**
 * UserCard 컴포넌트
 * @param {object} props
 * @param {string} [props.className] - 추가 Tailwind 클래스
 * @param {React.ReactNode} [props.children] - 하위 요소
 */
export function UserCard({ className, children, ...props }) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  )
}
