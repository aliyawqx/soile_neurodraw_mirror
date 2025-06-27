"use client"

import { Button } from "@/components/ui/button"

const COLORS = [
  "#000000", // Black
  "#FF0000", // Red
  "#FFA500", // Orange
  "#FFFF00", // Yellow
  "#008000", // Green
  "#0000FF", // Blue
  "#4B0082", // Indigo
  "#EE82EE", // Violet
  "#FFC0CB", // Pink
  "#A52A2A", // Brown
  "#808080", // Gray
  "#FFFFFF", // White
]

interface ColorPaletteProps {
  currentColor: string
  onColorChange: (color: string) => void
}

export function ColorPalette({ currentColor, onColorChange }: ColorPaletteProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {COLORS.map((color) => (
        <Button
          key={color}
          className="w-full h-8 p-0 rounded-md"
          style={{
            backgroundColor: color,
            border: currentColor === color ? "2px solid black" : "1px solid #e2e8f0",
          }}
          onClick={() => onColorChange(color)}
          variant="outline"
        />
      ))}
      <div className="col-span-4 mt-2">
        <input
          type="color"
          value={currentColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full h-8"
        />
      </div>
    </div>
  )
}
