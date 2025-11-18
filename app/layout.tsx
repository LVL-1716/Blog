import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Blog.tsx - Next.js 15',
  description: 'Blog sobre desenvolvimento web',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
