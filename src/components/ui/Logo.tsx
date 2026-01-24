'use client'

import Image from 'next/image'
import { useTheme } from '@/components/providers/ThemeProvider'

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

export function Logo({ width = 32, height = 32, className = '' }: LogoProps) {
  const { resolvedTheme } = useTheme()

  // Use logo-light.png on dark backgrounds, logo-dark.png on light backgrounds
  const logoSrc = resolvedTheme === 'dark' ? '/logo-light.png' : '/logo-dark.png'

  return (
    <Image
      src={logoSrc}
      alt="TokenCentric"
      width={width}
      height={height}
      className={`rounded-lg ${className}`}
    />
  )
}
