'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'
import { QRCodeSVG } from 'qrcode.react'

const PIX_KEY = '772337c9-12fc-47fa-8849-32fb5f696129'

export function PixSupport() {
  const t = useTranslations('support')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY)
      trackEvent(ANALYTICS_EVENTS.PIX_COPIED)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow max-w-sm mx-auto">
      {/* PIX Logo and Title */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <svg viewBox="0 0 512 512" className="w-8 h-8" fill="none">
          <rect width="512" height="512" rx="64" fill="#00D4AA" />
          <path
            d="M255.98 140.56c-21.82 0-42.32 8.5-57.74 23.93l-52.61 52.63c-4.62 4.63-12.66 4.63-17.28 0l-52.62-52.63C60.32 149.06 39.82 140.56 18 140.56H4.71l83.65 83.67c33.7 33.72 88.36 33.72 122.06 0l22.78-22.79c4.64-4.64 12.17-4.64 16.81 0l22.78 22.79c33.7 33.72 88.36 33.72 122.06 0l83.65-83.67h-13.29c-21.82 0-42.32 8.5-57.74 23.93l-52.62 52.63c-4.62 4.63-12.66 4.63-17.28 0l-52.61-52.63c-15.42-15.43-35.92-23.93-57.74-23.93h-.24zm0 230.88c21.82 0 42.32-8.5 57.74-23.93l52.61-52.63c4.62-4.63 12.66-4.63 17.28 0l52.62 52.63c15.42 15.43 35.92 23.93 57.74 23.93h13.29l-83.65-83.67c-33.7-33.72-88.36-33.72-122.06 0l-22.78 22.79c-4.64 4.64-12.17 4.64-16.81 0l-22.78-22.79c-33.7-33.72-88.36-33.72-122.06 0L4.47 371.44H18c21.82 0 42.32-8.5 57.74-23.93l52.62-52.63c4.62-4.63 12.66-4.63 17.28 0l52.61 52.63c15.42 15.43 35.92 23.93 57.74 23.93h-.01z"
            fill="white"
          />
        </svg>
        <span className="text-xl font-bold text-slate-900 dark:text-white">PIX</span>
      </div>

      {/* QR Code */}
      <div className="bg-white p-4 rounded-xl mb-4 inline-block">
        <QRCodeSVG
          value={PIX_KEY}
          size={160}
          level="M"
          marginSize={0}
        />
      </div>

      {/* PIX Key Display */}
      <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3 mb-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
          {t('pixKey')}
        </p>
        <p className="font-mono text-slate-900 dark:text-white text-xs break-all select-all">
          {PIX_KEY}
        </p>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className={`w-full px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 ${
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
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {t('copyPix')}
          </>
        )}
      </button>
    </div>
  )
}
