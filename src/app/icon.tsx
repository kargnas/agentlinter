import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
          <path d="M10 2L18 18H2L10 2Z" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="18" y1="14" x2="19" y2="10" stroke="#a78bfa" strokeWidth="1" />
          <line x1="18" y1="15.5" x2="19" y2="14" stroke="#5eead4" strokeWidth="1" />
          <line x1="18" y1="17" x2="19" y2="18" stroke="#E27B4E" strokeWidth="1" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
