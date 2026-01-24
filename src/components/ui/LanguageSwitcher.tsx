'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const locales = ['en', 'pt-BR'] as const
type Locale = (typeof locales)[number]

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  'pt-BR': 'PT',
}

function getCurrentLocale(): Locale {
  if (typeof document === 'undefined') return 'en'
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('NEXT_LOCALE='))
  if (cookie) {
    const value = cookie.split('=')[1] as Locale
    if (locales.includes(value)) return value
  }
  // Fallback to Accept-Language detection (browser preference)
  if (navigator.language.toLowerCase().startsWith('pt')) {
    return 'pt-BR'
  }
  return 'en'
}

function setLocale(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${60 * 60 * 24 * 365}`
  window.location.reload()
}

export function LanguageSwitcher() {
  const t = useTranslations('languageSwitcher')
  const [currentLocale, setCurrentLocale] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCurrentLocale(getCurrentLocale())
  }, [])

  // Render a placeholder with the same dimensions during SSR to avoid layout shift
  if (!mounted) {
    return (
      <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-700">
        {locales.map((locale) => (
          <div
            key={locale}
            className="px-2 py-1 rounded-md text-sm font-medium text-slate-500"
          >
            {localeLabels[locale]}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-700">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => setLocale(locale)}
          className={cn(
            'px-2 py-1 rounded-md text-sm font-medium transition-all duration-200',
            currentLocale === locale
              ? 'bg-white dark:bg-slate-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          )}
          title={t('label')}
        >
          {localeLabels[locale]}
        </button>
      ))}
    </div>
  )
}
