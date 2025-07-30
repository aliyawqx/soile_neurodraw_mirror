"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface EmotionalData {
  date: string
  calmness: number
  energy: number
  focus: number
  emotion: "excited" | "balanced" | "calm"
}

interface EmotionalGraphProps {
  data: EmotionalData[]
}

export function EmotionalGraph({ data }: EmotionalGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw background
    ctx.fillStyle = "#faf9fb"
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw grid
    ctx.strokeStyle = "#e8e1ec"
    ctx.lineWidth = 1

    // Vertical grid lines
    for (let i = 0; i <= data.length; i++) {
      const x = (i / data.length) * rect.width
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, rect.height)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = (i / 5) * rect.height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(rect.width, y)
      ctx.stroke()
    }

    // Draw lines
    if (data.length > 1) {
      const drawLine = (values: number[], color: string, lineWidth = 2, fillColor?: string) => {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth

        // Start point
        const startX = 0
        const startY = rect.height - (values[0] / 100) * rect.height
        ctx.moveTo(startX, startY)

        // Draw line segments
        for (let i = 1; i < values.length; i++) {
          const x = (i / (values.length - 1)) * rect.width
          const y = rect.height - (values[i] / 100) * rect.height
          ctx.lineTo(x, y)
        }

        // Stroke the line
        ctx.stroke()

        // Fill area under the line if fillColor is provided
        if (fillColor) {
          ctx.lineTo(rect.width, rect.height)
          ctx.lineTo(0, rect.height)
          ctx.closePath()
          ctx.fillStyle = fillColor
          ctx.fill()
        }
      }

      // Draw calmness line (purple)
      drawLine(
        data.map((d) => d.calmness),
        "#9b6eab",
        2,
        "rgba(155, 110, 171, 0.1)",
      )

      // Draw energy line (darker purple)
      drawLine(
        data.map((d) => d.energy),
        "#7d4a8a",
        2,
        "rgba(125, 74, 138, 0.1)",
      )

      // Draw focus line (light purple)
      drawLine(
        data.map((d) => d.focus),
        "#b899c4",
        2,
        "rgba(184, 153, 196, 0.1)",
      )

      // Draw emotion markers
      data.forEach((point, index) => {
        const x = (index / (data.length - 1)) * rect.width
        const y = rect.height - ((point.calmness + point.energy + point.focus) / 300) * rect.height

        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)

        // Color based on emotion
        if (point.emotion === "excited") {
          ctx.fillStyle = "#d4c4db" // Light purple
        } else if (point.emotion === "balanced") {
          ctx.fillStyle = "#9b6eab" // Medium purple
        } else {
          ctx.fillStyle = "#522859" // Dark purple
        }

        ctx.fill()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.stroke()
      })
    }

    // Draw legend
    const legendY = rect.height - 20

    // Calmness
    ctx.fillStyle = "#9b6eab"
    ctx.fillRect(10, legendY, 15, 10)
    ctx.fillStyle = "#522859"
    ctx.font = "12px sans-serif"
    ctx.fillText("Спокойствие", 30, legendY + 9)

    // Energy
    ctx.fillStyle = "#7d4a8a"
    ctx.fillRect(120, legendY, 15, 10)
    ctx.fillStyle = "#522859"
    ctx.fillText("Энергия", 140, legendY + 9)

    // Focus
    ctx.fillStyle = "#b899c4"
    ctx.fillRect(210, legendY, 15, 10)
    ctx.fillStyle = "#522859"
    ctx.fillText("Фокус", 230, legendY + 9)
  }, [data])

  if (data.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p>Нет данных для отображения. Создайте несколько рисунков, чтобы увидеть график.</p>
      </Card>
    )
  }

  return (
    <div className="w-full h-64">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
