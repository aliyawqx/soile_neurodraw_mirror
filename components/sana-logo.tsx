"use client"

import Image from "next/image"

interface SanaLogoProps {
  size?: number
  className?: string
}

export function SanaLogo({ size = 32, className = "" }: SanaLogoProps) {
  return (
    <Image
      src="/images/sana-logo.jpg"
      alt="Sana Logo"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      priority
    />
  )
}
