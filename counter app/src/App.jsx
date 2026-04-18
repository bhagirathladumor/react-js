import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  const color = count > 0 ? '#4ade80' : count < 0 ? '#f87171' : '#e2e8f0'

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        padding: '60px 80px',
        textAlign: 'center',
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)'
      }}>
        <p style={{ color: '#94a3b8', fontSize: '14px', letterSpacing: '4px', textTransform: 'uppercase', margin: '0 0 16px' }}>Counter App</p>

        <div style={{
          fontSize: '96px',
          fontWeight: '700',
          color: color,
          transition: 'color 0.3s',
          lineHeight: 1,
          marginBottom: '48px',
          textShadow: `0 0 40px ${color}55`
        }}>
          {count}
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          {[
            { label: '−', action: () => setCount(count - 1), bg: '#f87171' },
            { label: 'Reset', action: () => setCount(0), bg: '#94a3b8' },
            { label: '+', action: () => setCount(count + 1), bg: '#4ade80' },
          ].map(({ label, action, bg }) => (
            <button key={label} onClick={action} style={{
              background: bg,
              color: '#0f172a',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 28px',
              fontSize: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'transform 0.1s, opacity 0.2s',
              boxShadow: `0 4px 20px ${bg}55`
            }}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}
              onMouseDown={e => e.target.style.transform = 'scale(0.95)'}
              onMouseUp={e => e.target.style.transform = 'scale(1)'}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
