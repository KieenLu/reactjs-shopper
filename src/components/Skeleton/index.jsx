import React from 'react'
import { SkeletonStyle } from './style'
import { cn } from '@/utils'

export default function Skeleton({ shape = 'rectangle', width, height, children, ...props }) {
    return (
        <SkeletonStyle className={cn(shape, props.className)} style={{ width, height }} {...props}>{children}</SkeletonStyle>
    )
}