'use client';

import React from 'react';

interface BookMockup3DProps {
  coverUrl: string;
  title: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
}

export default function BookMockup3D({
  coverUrl,
  title,
  className = '',
  size = 'md',
  priority = false,
}: BookMockup3DProps) {
  const sizeClasses = {
    sm: 'w-[145px] h-[205px] sm:w-[175px] sm:h-[248px]',
    md: 'w-[165px] h-[233px] sm:w-[240px] sm:h-[340px]',
    lg: 'w-[190px] h-[268px] sm:w-[280px] sm:h-[396px]',
  }[size];

  return (
    <div className={`book-wrapper relative inline-block select-none ${className}`}>
      <div className={`book-3d relative overflow-hidden bg-slate-900 border border-slate-700/50 ${sizeClasses}`}>
        {/* Actual Cover Image */}
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover rounded-[3px]"
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* 3D Spine & Editorial Lighting Overlays */}
        <div className="book-spine-left" />
        <div className="book-emboss-shadow" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/10 pointer-events-none" />
      </div>
    </div>
  );
}
