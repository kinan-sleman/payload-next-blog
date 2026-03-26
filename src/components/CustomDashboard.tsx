import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { AnalyticsChart } from './AnalyticsChart'

export default async function CustomDashboard() {
  const payload = await getPayload({ config: configPromise })

  // Fetch count
  const [users, media, articles, authors] = await Promise.all([
    payload.find({ collection: 'users', limit: 0, depth: 0 }),
    payload.find({ collection: 'media', limit: 0, depth: 0 }),
    payload.find({ collection: 'articles', limit: 0, depth: 0 }),
    payload.find({ collection: 'article-authors', limit: 0, depth: 0 }),
  ])

  // Prepare data containing slug paths for "Add new" buttons
  const stats = [
    { name: 'Users', count: users.totalDocs, color: '#6366f1', slug: 'users' },
    { name: 'Media Files', count: media.totalDocs, color: '#ec4899', slug: 'media' },
    { name: 'Articles', count: articles.totalDocs, color: '#10b981', slug: 'articles' },
    { name: 'Authors', count: authors.totalDocs, color: '#f59e0b', slug: 'article-authors' },
  ]

  return (
    <div className="custom-dashboard" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '0.25rem',
            color: 'var(--theme-text)',
            letterSpacing: '-1px'
          }}>
            Dashboard Overview
          </h1>
          <p style={{ color: 'var(--theme-elevation-500)', fontSize: '1.1rem' }}>
            System activity, content metrics, and quick actions.
          </p>
        </div>
      </header>

      {/* Analytics Cards with Action Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        marginBottom: '4rem'
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            backgroundColor: 'var(--theme-elevation-50)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid var(--theme-elevation-100)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Top color indicator gradient */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, height: '4px',
              backgroundImage: `linear-gradient(90deg, ${stat.color}, ${stat.color}99)`
            }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--theme-elevation-500)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {stat.name}
              </span>
              <Link 
                href={`/admin/collections/${stat.slug}/create`}
                title={`Add new ${stat.name}`}
                style={{
                  color: stat.color,
                  opacity: 0.8,
                  transition: 'opacity 0.2s, transform 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
                className="add-new-btn-custom"
              >
                <PlusCircle size={22} strokeWidth={2.5} />
              </Link>
            </div>
            
            <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--theme-text)', lineHeight: 1 }}>
              {stat.count}
            </span>
          </div>
        ))}
      </div>

      {/* Interactive Recharts Analytics implementation */}
      <AnalyticsChart data={stats} />
      
    </div>
  )
}
