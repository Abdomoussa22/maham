'use client'
import React from 'react'
import { cn } from '../lib/utils'

interface SkeletonProps {
  type?: 'card' | 'text' | 'page'
  className?: string
}

const BaseSkeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse rounded-md bg-gray-200', className)} />
)

const Skeleton: React.FC<SkeletonProps> = ({ type = 'page' }) => {
  if (type === 'card') {
    return (
      <div className="w-full max-w-sm p-4 border rounded-lg shadow space-y-3">
        <BaseSkeleton className="h-40 w-full rounded-md" />
        <BaseSkeleton className="h-4 w-3/4" />
        <BaseSkeleton className="h-4 w-1/2" />
        <BaseSkeleton className="h-8 w-1/3 rounded-md" />
      </div>
    )
  }

  if (type === 'text') {
    return (
      <div className="space-y-2">
        <BaseSkeleton className="h-4 w-full" />
        <BaseSkeleton className="h-4 w-5/6" />
        <BaseSkeleton className="h-4 w-2/3" />
      </div>
    )
  }

  // النوع page (كروت فوق + نصوص تحت)
  return (
    <div className="space-y-6">
      {/* كروت في الأعلى */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Skeleton type="card" />
        <Skeleton type="card" />
        <Skeleton type="card" />
      </div>

      {/* نصوص في الأسفل */}
      <div className="space-y-4">
        <Skeleton type="text" />
        <Skeleton type="text" />
        <Skeleton type="text" />
      </div>
    </div>
  )
}

export default Skeleton
