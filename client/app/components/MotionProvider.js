"use client"
import {MotionConfig} from 'framer-motion'

export default function MotionProvider({ children, viewport}) {
    return (
        <MotionConfig>
            {children}
        </MotionConfig>
    )
}