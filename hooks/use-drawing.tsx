"use client"

import type React from "react"

import { useCallback, useEffect, useRef, useState } from "react"

export function useDrawing(canvasRef: React.RefObject<HTMLCanvasElement>, setMetrics: (metrics: any) => void) {
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColorState] = useState("#000000")
  const [brushSize, setBrushSize] = useState(5)
  const [drawingData, setDrawingData] = useState<string | null>(null)

  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const pointsRef = useRef<Array<{ x: number; y: number; color: string; size: number }>>([])
  const historyRef = useRef<Array<Array<{ x: number; y: number; color: string; size: number }>>>([])
  const historyIndexRef = useRef(-1)

  // Metrics tracking
  const speedPointsRef = useRef<Array<{ x: number; y: number; time: number }>>([])
  const anglesRef = useRef<number[]>([])
  const colorsUsedRef = useRef<Set<string>>(new Set())
  const patternPointsRef = useRef<Array<{ x: number; y: number }>>([])

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    // Get context
    const context = canvas.getContext("2d")
    if (!context) return

    context.scale(dpr, dpr)
    context.lineCap = "round"
    context.lineJoin = "round"
    context.strokeStyle = color
    context.lineWidth = brushSize

    contextRef.current = context

    // Clear canvas
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Reset history
    historyRef.current = []
    historyIndexRef.current = -1

    // Reset metrics
    speedPointsRef.current = []
    anglesRef.current = []
    colorsUsedRef.current = new Set()
    patternPointsRef.current = []

    // Update metrics
    updateMetrics()
  }, [canvasRef])

  // Calculate drawing metrics
  const updateMetrics = useCallback(() => {
    // Calculate line speed (based on distance between points and time)
    let lineSpeed = 0
    if (speedPointsRef.current.length > 1) {
      let totalSpeed = 0
      let count = 0

      for (let i = 1; i < speedPointsRef.current.length; i++) {
        const prev = speedPointsRef.current[i - 1]
        const curr = speedPointsRef.current[i]

        const distance = Math.sqrt(Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2))
        const timeDiff = curr.time - prev.time

        if (timeDiff > 0) {
          const speed = distance / timeDiff
          totalSpeed += speed
          count++
        }
      }

      lineSpeed = count > 0 ? Math.min(100, (totalSpeed / count) * 100) : 0
    }

    // Calculate line sharpness (based on angles between line segments)
    let lineSharpness = 0
    if (anglesRef.current.length > 0) {
      const avgAngle = anglesRef.current.reduce((sum, angle) => sum + angle, 0) / anglesRef.current.length
      lineSharpness = Math.min(100, avgAngle * 100)
    }

    // Calculate color intensity (based on colors used)
    let colorIntensity = 0
    if (colorsUsedRef.current.size > 0) {
      let totalIntensity = 0

      colorsUsedRef.current.forEach((colorHex) => {
        // Convert hex to RGB
        const r = Number.parseInt(colorHex.slice(1, 3), 16)
        const g = Number.parseInt(colorHex.slice(3, 5), 16)
        const b = Number.parseInt(colorHex.slice(5, 7), 16)

        // Calculate color intensity (saturation and brightness)
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const delta = max - min

        const saturation = max === 0 ? 0 : delta / max
        const brightness = max / 255

        totalIntensity += (saturation + brightness) / 2
      })

      colorIntensity = Math.min(100, (totalIntensity / colorsUsedRef.current.size) * 100)
    }

    // Calculate pattern repetition (based on point distribution)
    let patternRepetition = 0
    if (patternPointsRef.current.length > 0) {
      // Divide canvas into a grid and count points in each cell
      const gridSize = 10
      const grid: number[][] = Array(gridSize)
        .fill(0)
        .map(() => Array(gridSize).fill(0))

      patternPointsRef.current.forEach((point) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const gridX = Math.floor((point.x / canvas.width) * gridSize)
        const gridY = Math.floor((point.y / canvas.height) * gridSize)

        if (gridX >= 0 && gridX < gridSize && gridY >= 0 && gridY < gridSize) {
          grid[gridY][gridX]++
        }
      })

      // Calculate standard deviation of point distribution
      let sum = 0
      let count = 0

      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          if (grid[y][x] > 0) {
            sum += grid[y][x]
            count++
          }
        }
      }

      const mean = count > 0 ? sum / count : 0

      let variance = 0
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          if (grid[y][x] > 0) {
            variance += Math.pow(grid[y][x] - mean, 2)
          }
        }
      }

      const stdDev = count > 0 ? Math.sqrt(variance / count) : 0

      // Lower standard deviation means more uniform (repetitive) pattern
      patternRepetition = Math.min(100, 100 - (stdDev / mean) * 50)
    }

    setMetrics({
      lineSpeed: Math.round(lineSpeed),
      lineSharpness: Math.round(lineSharpness),
      colorIntensity: Math.round(colorIntensity),
      patternRepetition: Math.round(patternRepetition),
    })
  }, [canvasRef, setMetrics])

  // Start drawing
  const startDrawing = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas || !contextRef.current) return

      setIsDrawing(true)

      const rect = canvas.getBoundingClientRect()
      let clientX, clientY

      if ("touches" in event) {
        // Touch event
        clientX = event.touches[0].clientX
        clientY = event.touches[0].clientY
      } else {
        // Mouse event
        clientX = event.clientX
        clientY = event.clientY
      }

      const x = clientX - rect.left
      const y = clientY - rect.top

      // Ensure the current color is applied
      contextRef.current.strokeStyle = color
      contextRef.current.lineWidth = brushSize

      contextRef.current.beginPath()
      contextRef.current.moveTo(x, y)

      // Add point to current stroke
      pointsRef.current = [{ x, y, color, size: brushSize }]

      // Add point to metrics tracking
      speedPointsRef.current.push({ x, y, time: Date.now() })
      patternPointsRef.current.push({ x, y })
      colorsUsedRef.current.add(color)
    },
    [canvasRef, color, brushSize],
  )

  // Draw
  const draw = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !contextRef.current || !canvasRef.current) return

      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      let clientX, clientY

      if ("touches" in event) {
        // Touch event
        clientX = event.touches[0].clientX
        clientY = event.touches[0].clientY
      } else {
        // Mouse event
        clientX = event.clientX
        clientY = event.clientY
      }

      const x = clientX - rect.left
      const y = clientY - rect.top

      // Ensure the current color is applied
      contextRef.current.strokeStyle = color
      contextRef.current.lineWidth = brushSize

      contextRef.current.lineTo(x, y)
      contextRef.current.stroke()

      // Add point to current stroke
      pointsRef.current.push({ x, y, color, size: brushSize })

      // Add point to metrics tracking
      speedPointsRef.current.push({ x, y, time: Date.now() })
      patternPointsRef.current.push({ x, y })

      // Calculate angle for line sharpness
      if (pointsRef.current.length >= 3) {
        const p1 = pointsRef.current[pointsRef.current.length - 3]
        const p2 = pointsRef.current[pointsRef.current.length - 2]
        const p3 = pointsRef.current[pointsRef.current.length - 1]

        // Calculate vectors
        const v1 = { x: p2.x - p1.x, y: p2.y - p1.y }
        const v2 = { x: p3.x - p2.x, y: p3.y - p2.y }

        // Calculate magnitudes
        const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y)
        const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y)

        if (mag1 > 0 && mag2 > 0) {
          // Calculate dot product
          const dot = v1.x * v2.x + v1.y * v2.y

          // Calculate angle in radians
          let angle = Math.acos(Math.min(1, Math.max(-1, dot / (mag1 * mag2))))

          // Convert to degrees
          angle = angle * (180 / Math.PI)

          // Add to angles array
          anglesRef.current.push(angle / 180) // Normalize to 0-1
        }
      }

      // Update metrics occasionally
      if (Math.random() < 0.1) {
        updateMetrics()
      }
    },
    [isDrawing, canvasRef, color, brushSize, updateMetrics],
  )

  // Stop drawing
  const stopDrawing = useCallback(() => {
    if (!isDrawing || !contextRef.current) return

    contextRef.current.closePath()
    setIsDrawing(false)

    // Add current stroke to history
    if (pointsRef.current.length > 0) {
      // Remove any "undone" history
      if (historyIndexRef.current < historyRef.current.length - 1) {
        historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1)
      }

      historyRef.current.push([...pointsRef.current])
      historyIndexRef.current = historyRef.current.length - 1

      // Update drawing data
      const canvas = canvasRef.current
      if (canvas) {
        setDrawingData(canvas.toDataURL())
      }

      // Update metrics
      updateMetrics()
    }
  }, [isDrawing, canvasRef, updateMetrics])

  // Clear canvas
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const context = contextRef.current

    if (!canvas || !context) return

    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Reset history
    historyRef.current = []
    historyIndexRef.current = -1

    // Reset metrics
    speedPointsRef.current = []
    anglesRef.current = []
    colorsUsedRef.current = new Set()
    patternPointsRef.current = []

    // Update metrics
    updateMetrics()

    // Update drawing data
    setDrawingData(canvas.toDataURL())
  }, [canvasRef, updateMetrics])

  // Undo
  const undo = useCallback(() => {
    if (historyIndexRef.current < 0 || !contextRef.current || !canvasRef.current) return

    historyIndexRef.current--

    // Redraw canvas
    redrawCanvas()
  }, [canvasRef])

  // Redo
  const redo = useCallback(() => {
    if (historyIndexRef.current >= historyRef.current.length - 1 || !contextRef.current || !canvasRef.current) return

    historyIndexRef.current++

    // Redraw canvas
    redrawCanvas()
  }, [canvasRef])

  // Redraw canvas based on history
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const context = contextRef.current

    if (!canvas || !context) return

    // Clear canvas
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Redraw strokes up to current history index
    for (let i = 0; i <= historyIndexRef.current; i++) {
      const stroke = historyRef.current[i]

      if (stroke.length > 0) {
        const firstPoint = stroke[0]

        context.beginPath()
        context.strokeStyle = firstPoint.color
        context.lineWidth = firstPoint.size
        context.moveTo(firstPoint.x, firstPoint.y)

        for (let j = 1; j < stroke.length; j++) {
          const point = stroke[j]

          // If color or size changes, start a new path
          if (point.color !== context.strokeStyle || point.size !== context.lineWidth) {
            context.stroke()
            context.beginPath()
            context.strokeStyle = point.color
            context.lineWidth = point.size
            context.moveTo(stroke[j - 1].x, stroke[j - 1].y)
          }

          context.lineTo(point.x, point.y)
        }

        context.stroke()
      }
    }

    // Update drawing data
    setDrawingData(canvas.toDataURL())
  }, [canvasRef])

  // Save drawing
  const saveDrawing = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const imageData = canvas.toDataURL()
    setDrawingData(imageData)

    // Get final metrics
    updateMetrics()

    // Save to localStorage
    const savedDrawings = localStorage.getItem("neuroDrawings")
    const drawings = savedDrawings ? JSON.parse(savedDrawings) : []

    drawings.unshift({
      date: new Date().toISOString(),
      imageData,
      metrics: {
        lineSpeed: Math.round(Math.random() * 100), // Replace with actual metrics
        lineSharpness: Math.round(Math.random() * 100),
        colorIntensity: Math.round(Math.random() * 100),
        patternRepetition: Math.round(Math.random() * 100),
      },
    })

    localStorage.setItem("neuroDrawings", JSON.stringify(drawings.slice(0, 20))) // Keep only last 20 drawings

    return imageData
  }, [canvasRef, updateMetrics])

  const setBrush = useCallback((size: number) => {
    setBrushSize(size)
  }, [])

  const setColor = useCallback((newColor: string) => {
    setColorState(newColor)
    if (contextRef.current) {
      contextRef.current.strokeStyle = newColor
    }
  }, [])

  return {
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    undo,
    redo,
    canUndo: historyIndexRef.current >= 0,
    canRedo: historyIndexRef.current < historyRef.current.length - 1,
    saveDrawing,
    drawingData,
    setColor,
    setBrush,
  }
}
