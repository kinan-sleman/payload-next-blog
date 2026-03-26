import React from 'react'
import '../app/(payload)/custom.scss' // ensure our specific variables load, optional though

export function AdminLogo() {
  return (
    <div className="admin-logo">
      <div className="admin-logo__icon" style={{
        background: 'linear-gradient(135deg, var(--theme-success-400) 0%, var(--theme-success-500) 100%)',
        color: '#fff',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        P
      </div>
      <span style={{ 
        fontWeight: 'bold', 
        fontSize: '1.25rem',
        letterSpacing: '-0.025em',
        color: 'var(--theme-text)'
       }}>
        Payload<span style={{ color: 'var(--theme-success-500)' }}>Blog</span>
      </span>
    </div>
  )
}
