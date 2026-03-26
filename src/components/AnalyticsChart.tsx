'use client';

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';

type ChartProps = {
  data: Array<{ name: string; count: number; color: string; slug: string }>;
};

export const AnalyticsChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
      
      {/* Bar Chart */}
      <div style={{
        backgroundColor: 'var(--theme-elevation-50)',
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid var(--theme-elevation-100)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        height: '400px'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--theme-text)' }}>
          Content Distribution Overview
        </h2>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--theme-elevation-150)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--theme-elevation-500)', fontSize: 13 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--theme-elevation-500)', fontSize: 13 }} />
            <Tooltip 
              cursor={{ fill: 'var(--theme-elevation-100)', opacity: 0.5 }}
              contentStyle={{ backgroundColor: 'var(--theme-elevation-50)', border: '1px solid var(--theme-elevation-150)', borderRadius: '8px', color: 'var(--theme-text)' }} 
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div style={{
        backgroundColor: 'var(--theme-elevation-50)',
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid var(--theme-elevation-100)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        height: '400px'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--theme-text)' }}>
          System Ratio
        </h2>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={5}
              dataKey="count"
              stroke="none"
              label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--theme-elevation-50)', border: '1px solid var(--theme-elevation-150)', borderRadius: '8px', color: 'var(--theme-text)' }} 
              itemStyle={{ color: 'var(--theme-text)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
