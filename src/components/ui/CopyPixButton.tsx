'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

const PIX_KEY = '772337c9-12fc-47fa-8849-32fb5f696129'

export function CopyPixButton() {
  const t = useTranslations('support')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`w-full px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center gap-3 ${
        copied
          ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
          : 'bg-[#00D4AA] hover:bg-[#00B894] text-white'
      }`}
    >
      {copied ? (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {t('copied')}
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M13.4 4.8l3.1 3.1c.7.7 1.1 1.7 1.1 2.7v.5l-3.4 3.4c-1.1 1.1-2.9 1.1-4 0l-2.6-2.6c-.2-.2-.5-.2-.7 0l-2.6 2.6c-1.1 1.1-2.9 1.1-4 0L0 11.1v-.5c0-1 .4-2 1.1-2.7L4.2 4.8c.5-.5 1.2-.8 1.9-.8h.3l3.4 3.4c1.1 1.1 2.9 1.1 4 0l3.4-3.4h.3c.7 0 1.4.3 1.9.8zm-2.8 14.4l-3.1-3.1c-.7-.7-1.1-1.7-1.1-2.7v-.5l3.4-3.4c1.1-1.1 2.9-1.1 4 0l2.6 2.6c.2.2.5.2.7 0l2.6-2.6c1.1-1.1 2.9-1.1 4 0L24 12.9v.5c0 1-.4 2-1.1 2.7l-3.1 3.1c-.5.5-1.2.8-1.9.8h-.3l-3.4-3.4c-1.1-1.1-2.9-1.1-4 0l-3.4 3.4h-.3c-.7 0-1.4-.3-1.9-.8z"/>
          </svg>
          {t('copyPix')}
        </>
      )}
    </button>
  )
}
