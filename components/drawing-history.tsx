"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DrawingHistoryProps {
  drawings: any[]
}

export function DrawingHistory({ drawings }: DrawingHistoryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (drawings.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p>У вас пока нет сохраненных рисунков. Создайте свой первый рисунок!</p>
      </Card>
    )
  }

  const currentDrawing = drawings[currentIndex]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getEmotionalState = (metrics: any) => {
    const { lineSharpness, lineSpeed, colorIntensity, patternRepetition } = metrics

    if (lineSharpness > 70 && lineSpeed > 60) {
      return "тревожный"
    } else if (lineSharpness < 30 && lineSpeed < 40) {
      return "спокойный"
    } else if (patternRepetition > 70) {
      return "сосредоточенный"
    } else if (colorIntensity > 70) {
      return "энергичный"
    } else {
      return "уравновешенный"
    }
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : drawings.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < drawings.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={handlePrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span>
          {currentIndex + 1} из {drawings.length}
        </span>
        <Button variant="outline" size="icon" onClick={handleNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="aspect-square relative mb-4 border rounded-md overflow-hidden">
            <img
              src={currentDrawing.imageData || "/placeholder.svg"}
              alt={`Рисунок от ${formatDate(currentDrawing.date)}`}
              className="object-contain w-full h-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <h3 className="font-medium">Дата:</h3>
              <span>{formatDate(currentDrawing.date)}</span>
            </div>

            <div className="flex justify-between">
              <h3 className="font-medium">Состояние:</h3>
              <span>{getEmotionalState(currentDrawing.metrics)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <div>
                <div className="text-sm">Скорость линий</div>
                <div className="h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${currentDrawing.metrics.lineSpeed}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="text-sm">Резкость линий</div>
                <div className="h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${currentDrawing.metrics.lineSharpness}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="text-sm">Интенсивность цвета</div>
                <div className="h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${currentDrawing.metrics.colorIntensity}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="text-sm">Повторяемость</div>
                <div className="h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${currentDrawing.metrics.patternRepetition}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
